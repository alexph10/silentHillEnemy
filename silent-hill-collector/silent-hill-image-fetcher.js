// silent-hill-image-fetcher.js
// Specialized image fetcher for Silent Hill content from specific sources

import fetch from 'node-fetch';
import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { JSDOM } from 'jsdom';

class SilentHillImageFetcher {
  constructor(config = {}) {
    this.config = {
      outputDir: config.outputDir || './silent-hill-images',
      maxImagesPerMonster: config.maxImagesPerMonster || 10,
      minResolution: config.minResolution || { width: 512, height: 512 },
      redditConfig: {
        clientId: config.redditClientId || process.env.REDDIT_CLIENT_ID,
        clientSecret: config.redditClientSecret || process.env.REDDIT_CLIENT_SECRET,
        userAgent: config.userAgent || 'SilentHillImageFetcher/1.0'
      },
      sources: {
        wiki: config.enableWiki !== false,
        reddit: config.enableReddit !== false,
        officialSites: config.enableOfficial !== false
      },
      rateLimit: config.rateLimit || 2000 // ms between requests
    };

    this.redditToken = null;
    this.processedUrls = new Set();
    
    // Silent Hill specific search terms
    this.searchModifiers = [
      'concept art',
      'official art',
      'creature design',
      'monster design',
      'promotional art',
      'game screenshot',
      'HD collection',
      'original design'
    ];
  }

  // Initialize Reddit authentication
  async initializeReddit() {
    if (!this.config.redditConfig.clientId || !this.config.redditConfig.clientSecret) {
      console.log('Reddit API credentials not found, skipping Reddit search');
      return false;
    }

    try {
      const auth = Buffer.from(
        `${this.config.redditConfig.clientId}:${this.config.redditConfig.clientSecret}`
      ).toString('base64');

      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
          'User-Agent': this.config.redditConfig.userAgent
        },
        body: 'grant_type=client_credentials'
      });

      const data = await response.json();
      this.redditToken = data.access_token;
      console.log('Reddit authentication successful');
      return true;
    } catch (error) {
      console.error('Failed to authenticate with Reddit:', error);
      return false;
    }
  }

  // Main fetching function
  async fetchMonsterImages(monsterName, gameVersion = null) {
    console.log(`\nFetching images for: ${monsterName}`);
    if (gameVersion) {
      console.log(`Game version: ${gameVersion}`);
    }

    const allImages = [];

    // Search Silent Hill Wiki
    if (this.config.sources.wiki) {
      console.log('Searching Silent Hill Wiki...');
      const wikiImages = await this.searchSilentHillWiki(monsterName, gameVersion);
      allImages.push(...wikiImages);
      await this.delay(this.config.rateLimit);
    }

    // Search Reddit
    if (this.config.sources.reddit) {
      console.log('Searching Reddit communities...');
      await this.initializeReddit();
      const redditImages = await this.searchReddit(monsterName, gameVersion);
      allImages.push(...redditImages);
      await this.delay(this.config.rateLimit);
    }

    // Search official/known artwork repositories
    if (this.config.sources.officialSites) {
      console.log('Searching official sources...');
      const officialImages = await this.searchOfficialSources(monsterName, gameVersion);
      allImages.push(...officialImages);
    }

    // Remove duplicates based on URL
    const uniqueImages = this.removeDuplicates(allImages);

    // Filter and score images
    const validImages = await this.filterAndScoreImages(uniqueImages);

    // Download the best images
    const downloadedImages = await this.downloadImages(
      validImages.slice(0, this.config.maxImagesPerMonster),
      monsterName,
      gameVersion
    );

    return downloadedImages;
  }

  // Search Silent Hill Wiki (Fandom)
  async searchSilentHillWiki(monsterName, gameVersion) {
    const images = [];
    
    try {
      // Format the monster name for wiki URL
      const wikiName = monsterName.replace(/\s+/g, '_');
      const baseUrl = 'https://silenthill.fandom.com/wiki/';
      
      // Try direct monster page
      const monsterUrl = `${baseUrl}${wikiName}`;
      console.log(`  Checking: ${monsterUrl}`);
      
      const response = await fetch(monsterUrl, {
        headers: {
          'User-Agent': this.config.redditConfig.userAgent
        }
      });

      if (response.ok) {
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        // Find images in the gallery and main content
        const imageElements = document.querySelectorAll([
          '.mw-parser-output img',
          '.wikia-gallery-item img',
          '.image img',
          'figure img',
          '.pi-image img' // Infobox images
        ].join(', '));

        for (const img of imageElements) {
          let src = img.src || img.getAttribute('data-src');
          
          if (src && !this.isIconOrButton(src)) {
            // Get higher resolution version if available
            src = this.getHighResUrl(src);
            
            // Extract image title/alt for context
            const alt = img.alt || '';
            const title = img.title || '';
            
            // Skip UI elements and icons
            if (this.isRelevantImage(src, alt, title, monsterName)) {
              images.push({
                url: src.startsWith('http') ? src : `https:${src}`,
                source: 'silenthill-wiki',
                context: alt || title || 'Wiki image',
                monsterName: monsterName,
                pageUrl: monsterUrl
              });
            }
          }
        }

        // Also check for links to image pages
        const imageLinks = document.querySelectorAll('a.image, a[href*="/wiki/File:"]');
        for (const link of imageLinks) {
          const href = link.href;
          if (href && href.includes('/wiki/File:')) {
            const imagePageUrl = href.startsWith('http') 
              ? href 
              : `https://silenthill.fandom.com${href}`;
            
            const imageSrc = await this.extractImageFromWikiPage(imagePageUrl);
            if (imageSrc) {
              images.push({
                url: imageSrc,
                source: 'silenthill-wiki',
                context: link.title || 'Wiki image',
                monsterName: monsterName,
                pageUrl: imagePageUrl
              });
            }
          }
        }

        console.log(`  Found ${images.length} images on wiki page`);
      }

      // Search gallery pages if they exist
      if (gameVersion) {
        const galleryUrl = `${baseUrl}${wikiName}/Gallery`;
        const galleryImages = await this.searchWikiGallery(galleryUrl, monsterName);
        images.push(...galleryImages);
      }

    } catch (error) {
      console.error('Error searching Silent Hill Wiki:', error);
    }

    return images;
  }

  // Extract full resolution image from wiki file page
  async extractImageFromWikiPage(pageUrl) {
    try {
      const response = await fetch(pageUrl);
      if (!response.ok) return null;

      const html = await response.text();
      const dom = new JSDOM(html);
      const document = dom.window.document;

      // Look for the full resolution link
      const fullResLink = document.querySelector('.fullImageLink a, .internal');
      if (fullResLink && fullResLink.href) {
        const url = fullResLink.href.startsWith('http') 
          ? fullResLink.href 
          : `https:${fullResLink.href}`;
        return url;
      }

      // Fallback to main image
      const mainImage = document.querySelector('.fullMedia img, #file img');
      if (mainImage && mainImage.src) {
        return this.getHighResUrl(mainImage.src);
      }

    } catch (error) {
      console.error(`Error extracting image from ${pageUrl}:`, error);
    }
    return null;
  }

  // Search wiki gallery pages
  async searchWikiGallery(galleryUrl, monsterName) {
    const images = [];
    
    try {
      const response = await fetch(galleryUrl);
      if (response.ok) {
        const html = await response.text();
        const dom = new JSDOM(html);
        const document = dom.window.document;

        const galleryImages = document.querySelectorAll(
          '.wikia-gallery-item img, .gallery img'
        );

        for (const img of galleryImages) {
          const src = this.getHighResUrl(img.src || img.getAttribute('data-src'));
          if (src && this.isRelevantImage(src, img.alt, img.title, monsterName)) {
            images.push({
              url: src.startsWith('http') ? src : `https:${src}`,
              source: 'silenthill-wiki-gallery',
              context: img.alt || img.title || 'Gallery image',
              monsterName: monsterName,
              pageUrl: galleryUrl
            });
          }
        }

        console.log(`  Found ${images.length} images in gallery`);
      }
    } catch (error) {
      console.error('Error searching wiki gallery:', error);
    }

    return images;
  }

  // Search Reddit for Silent Hill images
  async searchReddit(monsterName, gameVersion) {
    const images = [];
    
    if (!this.redditToken) {
      console.log('  Reddit not authenticated, skipping');
      return images;
    }

    // Subreddits to search
    const subreddits = [
      'silenthill',
      'HorrorGaming', 
      'creepygaming',
      'TwoBestFriendsPlay', // They did SH playthroughs
      'GameArt'
    ];

    for (const subreddit of subreddits) {
      try {
        // Search for monster-specific posts
        const searchQuery = gameVersion 
          ? `${monsterName} ${gameVersion}`
          : monsterName;

        const searchUrl = `https://oauth.reddit.com/r/${subreddit}/search.json?q=${encodeURIComponent(searchQuery)}&restrict_sr=1&limit=25&sort=relevance`;

        const response = await fetch(searchUrl, {
          headers: {
            'Authorization': `Bearer ${this.redditToken}`,
            'User-Agent': this.config.redditConfig.userAgent
          }
        });

        if (response.ok) {
          const data = await response.json();
          
          for (const post of data.data.children) {
            const postData = post.data;
            
            // Check if post contains images
            if (postData.url && this.isImageUrl(postData.url)) {
              images.push({
                url: postData.url,
                source: `reddit-${subreddit}`,
                context: postData.title,
                monsterName: monsterName,
                score: postData.score,
                postUrl: `https://reddit.com${postData.permalink}`,
                author: postData.author
              });
            }

            // Check gallery posts
            if (postData.is_gallery && postData.media_metadata) {
              for (const mediaId in postData.media_metadata) {
                const media = postData.media_metadata[mediaId];
                if (media.s && media.s.u) {
                  // Decode Reddit's preview URL to get full URL
                  const fullUrl = media.s.u.replace(/preview.redd.it/, 'i.redd.it')
                    .replace(/\?.*$/, '')
                    .replace(/&amp;/g, '&');
                  
                  images.push({
                    url: fullUrl,
                    source: `reddit-${subreddit}`,
                    context: postData.title,
                    monsterName: monsterName,
                    score: postData.score,
                    postUrl: `https://reddit.com${postData.permalink}`,
                    author: postData.author
                  });
                }
              }
            }

            // Check for imgur links in self posts
            if (postData.selftext) {
              const imgurLinks = this.extractImgurLinks(postData.selftext);
              for (const link of imgurLinks) {
                images.push({
                  url: link,
                  source: `reddit-${subreddit}`,
                  context: postData.title,
                  monsterName: monsterName,
                  score: postData.score,
                  postUrl: `https://reddit.com${postData.permalink}`,
                  author: postData.author
                });
              }
            }
          }

          console.log(`  Found ${images.length} images in r/${subreddit}`);
        }

        await this.delay(1000); // Reddit rate limiting
        
      } catch (error) {
        console.error(`Error searching r/${subreddit}:`, error);
      }
    }

    // Sort Reddit images by score (upvotes)
    images.sort((a, b) => (b.score || 0) - (a.score || 0));

    return images;
  }

  // Search official Silent Hill sources
  async searchOfficialSources(monsterName, gameVersion) {
    const images = [];
    
    // Known repositories of official Silent Hill artwork
    const officialSources = [
      {
        name: 'Silent Hill Memories',
        searchUrl: `https://www.silenthillmemories.net/search?q=${encodeURIComponent(monsterName)}`,
        selector: '.artwork img, .gallery img'
      },
      {
        name: 'Silent Hill Collection',
        baseUrl: 'https://silenthill.collection.com/', // Example - replace with actual
        selector: '.monster-art img'
      }
    ];

    for (const source of officialSources) {
      try {
        console.log(`  Checking ${source.name}...`);
        
        // Note: Some official sites may require different approaches
        // This is a template that would need adjustment for specific sites
        
        if (source.searchUrl) {
          const response = await fetch(source.searchUrl, {
            headers: {
              'User-Agent': this.config.redditConfig.userAgent
            }
          });

          if (response.ok) {
            const html = await response.text();
            const dom = new JSDOM(html);
            const document = dom.window.document;

            const imageElements = document.querySelectorAll(source.selector);
            
            for (const img of imageElements) {
              const src = img.src || img.getAttribute('data-src');
              if (src && this.isRelevantImage(src, img.alt, '', monsterName)) {
                images.push({
                  url: src.startsWith('http') ? src : `https:${src}`,
                  source: source.name.toLowerCase().replace(/\s+/g, '-'),
                  context: `Official artwork from ${source.name}`,
                  monsterName: monsterName,
                  official: true
                });
              }
            }
          }
        }

        await this.delay(this.config.rateLimit);
        
      } catch (error) {
        console.error(`Error searching ${source.name}:`, error);
      }
    }

    // Add Lost Memories book artwork references
    const lostMemoriesArt = this.getLostMemoriesArtwork(monsterName);
    images.push(...lostMemoriesArt);

    return images;
  }

  // Get references to Lost Memories artwork
  getLostMemoriesArtwork(monsterName) {
    // This would contain known artwork from the Lost Memories art book
    // These would be references to find, not direct downloads
    const artworkDatabase = {
      'Pyramid Head': [
        'lost_memories_pyramid_head_concept_01',
        'lost_memories_pyramid_head_masahiro_ito'
      ],
      'Nurse': [
        'lost_memories_nurse_concept_sh2',
        'lost_memories_bubble_head_nurse'
      ],
      'Abstract Daddy': [
        'lost_memories_abstract_daddy_concept'
      ]
      // Add more monsters
    };

    const references = artworkDatabase[monsterName] || [];
    
    return references.map(ref => ({
      url: `search_for:${ref}`, // Placeholder for manual search
      source: 'lost-memories-reference',
      context: `Lost Memories artwork reference: ${ref}`,
      monsterName: monsterName,
      official: true,
      requiresManualSearch: true
    }));
  }

  // Helper: Check if URL is an image
  isImageUrl(url) {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];
    const urlLower = url.toLowerCase();
    
    // Check file extension
    if (imageExtensions.some(ext => urlLower.includes(ext))) {
      return true;
    }
    
    // Check for image hosting services
    if (urlLower.includes('i.redd.it') || 
        urlLower.includes('imgur.com') ||
        urlLower.includes('i.imgur.com')) {
      return true;
    }
    
    return false;
  }

  // Helper: Extract Imgur links from text
  extractImgurLinks(text) {
    const links = [];
    const imgurRegex = /https?:\/\/(i\.)?imgur\.com\/[a-zA-Z0-9]+(\.[a-z]+)?/g;
    const matches = text.match(imgurRegex);
    
    if (matches) {
      for (let match of matches) {
        // Ensure it's a direct image link
        if (!match.includes('i.imgur.com')) {
          match = match.replace('imgur.com', 'i.imgur.com');
        }
        if (!match.match(/\.[a-z]+$/)) {
          match += '.jpg'; // Default to jpg if no extension
        }
        links.push(match);
      }
    }
    
    return links;
  }

  // Helper: Get high resolution version of wiki images
  getHighResUrl(url) {
    if (!url) return url;
    
    // Remove scaling parameters from Fandom URLs
    return url
      .replace(/\/revision\/latest\/scale-to-width-down\/\d+/, '/revision/latest')
      .replace(/\/scale-to-width-down\/\d+/, '')
      .replace(/\?cb=\d+/, '')
      .replace(/\/thumb\//, '/');
  }

  // Helper: Check if image is relevant (not UI element)
  isRelevantImage(url, alt, title, monsterName) {
    const irrelevantPatterns = [
      'wiki.png',
      'cursor',
      'icon',
      'button',
      'arrow',
      'badge',
      'commons-logo',
      'edit',
      'transparent.gif'
    ];
    
    const urlLower = url.toLowerCase();
    const combined = `${urlLower} ${alt} ${title}`.toLowerCase();
    
    // Skip if matches irrelevant patterns
    if (irrelevantPatterns.some(pattern => combined.includes(pattern))) {
      return false;
    }
    
    // Skip if too small (likely an icon)
    if (urlLower.includes('/50px-') || urlLower.includes('/30px-')) {
      return false;
    }
    
    return true;
  }

  // Helper: Check if URL is an icon or button
  isIconOrButton(url) {
    const iconPatterns = [
      '/icon',
      '/button',
      '/ui/',
      '/interface/',
      'transparent.gif',
      'blank.png',
      '1x1',
      'pixel.gif'
    ];
    
    return iconPatterns.some(pattern => url.toLowerCase().includes(pattern));
  }

  // Remove duplicate images based on URL
  removeDuplicates(images) {
    const seen = new Set();
    const unique = [];
    
    for (const image of images) {
      // Normalize URL for comparison
      const normalizedUrl = image.url
        .replace(/^https?:\/\//, '')
        .replace(/\?.*$/, '')
        .toLowerCase();
      
      if (!seen.has(normalizedUrl)) {
        seen.add(normalizedUrl);
        unique.push(image);
      }
    }
    
    return unique;
  }

  // Filter and score images
  async filterAndScoreImages(images) {
    const scoredImages = [];
    
    for (const image of images) {
      try {
        // Skip if requires manual search
        if (image.requiresManualSearch) {
          console.log(`  Manual search required for: ${image.context}`);
          continue;
        }

        // Try to get basic info about the image
        const score = this.calculateImageScore(image);
        
        scoredImages.push({
          ...image,
          score: score
        });
        
      } catch (error) {
        console.error(`Error scoring image ${image.url}:`, error);
      }
    }
    
    // Sort by score (higher is better)
    scoredImages.sort((a, b) => b.score - a.score);
    
    return scoredImages;
  }

  // Calculate image score based on source and metadata
  calculateImageScore(image) {
    let score = 0;
    
    // Source scoring
    if (image.official) score += 50;
    if (image.source.includes('wiki')) score += 30;
    if (image.source.includes('reddit')) score += 20 + (image.score || 0) / 100;
    
    // Context scoring
    const contextLower = (image.context || '').toLowerCase();
    if (contextLower.includes('concept')) score += 20;
    if (contextLower.includes('official')) score += 20;
    if (contextLower.includes('art')) score += 15;
    if (contextLower.includes('hd') || contextLower.includes('high res')) score += 10;
    
    // Monster name match
    if (contextLower.includes(image.monsterName.toLowerCase())) score += 10;
    
    return score;
  }

  // Download images with proper organization
  async downloadImages(images, monsterName, gameVersion) {
    const safeName = monsterName.toLowerCase().replace(/\s+/g, '_');
    const outputDir = gameVersion 
      ? path.join(this.config.outputDir, gameVersion, safeName)
      : path.join(this.config.outputDir, safeName);
    
    await fs.mkdir(outputDir, { recursive: true });
    
    const downloaded = [];
    let imageIndex = 1;
    
    for (const image of images) {
      try {
        console.log(`  Downloading: ${image.source} - ${image.context}`);
        
        const response = await fetch(image.url, {
          headers: {
            'User-Agent': this.config.redditConfig.userAgent
          }
        });
        
        if (!response.ok) {
          console.error(`  Failed to download: ${response.status}`);
          continue;
        }
        
        const buffer = await response.buffer();
        
        // Process with sharp
        const imageSharp = sharp(buffer);
        const metadata = await imageSharp.metadata();
        
        // Skip if too small
        if (metadata.width < this.config.minResolution.width || 
            metadata.height < this.config.minResolution.height) {
          console.log(`  Skipping: Image too small (${metadata.width}x${metadata.height})`);
          continue;
        }
        
        // Generate filename
        const ext = metadata.format || 'jpg';
        const filename = `${safeName}_${String(imageIndex).padStart(3, '0')}_${image.source}.${ext}`;
        const filepath = path.join(outputDir, filename);
        
        // Save optimized image
        await imageSharp
          .jpeg({ quality: 90 })
          .toFile(filepath);
        
        // Save metadata
        const metadataFile = path.join(outputDir, `${filename}.json`);
        await fs.writeFile(metadataFile, JSON.stringify({
          monsterName: monsterName,
          gameVersion: gameVersion,
          source: image.source,
          context: image.context,
          originalUrl: image.url,
          pageUrl: image.pageUrl,
          author: image.author,
          score: image.score,
          downloadedAt: new Date().toISOString(),
          dimensions: {
            width: metadata.width,
            height: metadata.height
          }
        }, null, 2));
        
        downloaded.push({
          filename,
          filepath,
          source: image.source,
          score: image.score
        });
        
        imageIndex++;
        console.log(`  ✓ Saved: ${filename}`);
        
        // Rate limiting
        await this.delay(1000);
        
      } catch (error) {
        console.error(`  Error downloading image:`, error.message);
      }
    }
    
    // Create manifest
    const manifestPath = path.join(outputDir, 'manifest.json');
    await fs.writeFile(manifestPath, JSON.stringify({
      monster: monsterName,
      gameVersion: gameVersion,
      totalImages: downloaded.length,
      sources: [...new Set(downloaded.map(d => d.source))],
      downloadedAt: new Date().toISOString(),
      images: downloaded
    }, null, 2));
    
    console.log(`\n✓ Downloaded ${downloaded.length} images for ${monsterName}`);
    
    return downloaded;
  }

  // Helper: Delay function
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Batch process multiple monsters
  async fetchMultipleMonsters(monsters) {
    const results = {};
    
    for (const monster of monsters) {
      const monsterData = typeof monster === 'string' 
        ? { name: monster } 
        : monster;
      
      results[monsterData.name] = await this.fetchMonsterImages(
        monsterData.name,
        monsterData.game
      );
      
      // Rate limiting between monsters
      await this.delay(5000);
    }
    
    return results;
  }
}

// Silent Hill monster database
const silentHillMonsters = [
  { name: 'Pyramid Head', game: 'SH2' },
  { name: 'Nurse', game: 'SH2' },
  { name: 'Bubble Head Nurse', game: 'SH2' },
  { name: 'Lying Figure', game: 'SH2' },
  { name: 'Mannequin', game: 'SH2' },
  { name: 'Abstract Daddy', game: 'SH2' },
  { name: 'Grey Child', game: 'SH1' },
  { name: 'Air Screamer', game: 'SH1' },
  { name: 'Romper', game: 'SH1' },
  { name: 'Split Head', game: 'SH3' },
  { name: 'Closer', game: 'SH3' },
  { name: 'Insane Cancer', game: 'SH3' },
  { name: 'Numb Body', game: 'SH3' },
  { name: 'Twin Victim', game: 'SH4' },
  { name: 'Wall Man', game: 'SH4' },
  { name: 'Sniffer Dog', game: 'SH4' },
  { name: 'Needler', game: 'Homecoming' },
  { name: 'Schism', game: 'Homecoming' },
  { name: 'Bogeyman', game: 'Downpour' },
  { name: 'Doll', game: 'Downpour' },
  { name: 'Weeping Bat', game: 'Downpour' },
  { name: 'Valtiel', game: 'SH3' }
];

// Main execution
async function main() {
  console.log('Silent Hill Image Fetcher');
  console.log('========================\n');
  
  const fetcher = new SilentHillImageFetcher({
    outputDir: './silent-hill-collection',
    maxImagesPerMonster: 15,
    minResolution: { width: 800, height: 600 },
    redditClientId: process.env.REDDIT_CLIENT_ID,
    redditClientSecret: process.env.REDDIT_CLIENT_SECRET,
    userAgent: 'SilentHillCollector/1.0',
    sources: {
      wiki: true,
      reddit: true,
      officialSites: true
    }
  });

  // Example: Fetch specific monsters
  const monstersToFetch = [
    { name: 'Pyramid Head', game: 'SH2' },
    { name: 'Bubble Head Nurse', game: 'SH2' },
    { name: 'Lying Figure', game: 'SH2' }
  ];

  console.log(`Fetching ${monstersToFetch.length} monsters...\n`);
  
  for (const monster of monstersToFetch) {
    await fetcher.fetchMonsterImages(monster.name, monster.game);
    console.log('\n' + '─'.repeat(50) + '\n');
    await fetcher.delay(5000); // Be respectful to servers
  }
  
  console.log('\n✓ Collection complete!');
  console.log(`Images saved to: ${fetcher.config.outputDir}`);
}

// Export for use in other modules
export default SilentHillImageFetcher;
export { silentHillMonsters };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}