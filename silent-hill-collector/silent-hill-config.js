
const SILENT_HILL_CONFIG = {
  // Output preferences
  output: {
    baseDir: './silent-hill-collection',
    organizeByGame: true,              // Creates SH1/, SH2/, SH3/ folders
    maxImagesPerMonster: 15,           // Limit per monster
    saveMetadata: true,                // Save JSON with attribution
    createManifest: true               // Create collection manifest
  },

  // Image quality preferences
  imageQuality: {
    minResolution: {
      width: 800,                      // Minimum 800px wide
      height: 600                      // Minimum 600px tall
    },
    preferredResolution: {
      width: 1920,                     // Ideal resolution
      height: 1080
    },
    acceptedFormats: ['jpg', 'jpeg', 'png', 'webp'],
    jpegQuality: 90,                   // Output JPEG quality
    skipIcons: true,                   // Auto-skip UI elements
    skipWatermarked: false              // Allow watermarked images
  },

  // Source preferences (what to search)
  sources: {
    silentHillWiki: {
      enabled: true,
      priority: 10,                     // Highest priority
      baseUrl: 'https://silenthill.fandom.com/wiki/',
      searchSections: [
        'main_content',                 // Main article content
        'gallery',                      // Gallery pages
        'infobox',                      // Character infoboxes
        'concept_art',                  // Concept art sections
        'screenshots'                   // Game screenshots
      ],
      extractHighRes: true              // Get full resolution versions
    },

    reddit: {
      enabled: true,
      priority: 7,
      subreddits: [
        {
          name: 'silenthill',
          searchDepth: 25,              // Posts to check
          minScore: 10,                 // Minimum upvotes
          sortBy: 'relevance'
        },
        {
          name: 'HorrorGaming',
          searchDepth: 15,
          minScore: 5,
          sortBy: 'relevance'
        },
        {
          name: 'creepygaming',
          searchDepth: 10,
          minScore: 5,
          sortBy: 'top'
        },
        {
          name: 'GameArt',
          searchDepth: 10,
          minScore: 20,
          sortBy: 'relevance'
        },
        {
          name: 'ImaginaryMonsters',    // Good for fan art
          searchDepth: 10,
          minScore: 50,
          sortBy: 'relevance'
        }
      ],
      includeComments: false,           // Don't search comment links
      allowNSFW: false,                 // Skip NSFW posts
      imageHosts: [                     // Accepted image hosts
        'i.redd.it',
        'imgur.com',
        'i.imgur.com',
        'preview.redd.it'
      ]
    },

    officialSites: {
      enabled: true,
      priority: 9,
      sites: [
        {
          name: 'Silent Hill Memories',
          url: 'https://www.silenthillmemories.net/',
          searchable: true
        },
        {
          name: 'Lost Memories References',
          type: 'reference_only',       // Manual search needed
          priority: 10
        }
      ]
    },

    additionalSites: {
      enabled: false,                   // Can enable if needed
      sites: [
        'deviantart.com',               // Fan art
        'artstation.com',               // Professional fan art
        'pinterest.com',                // Collections (be careful of copyright)
        'tumblr.com'                    // Fan blogs
      ]
    }
  },

  // Search preferences
  searchPreferences: {
    // How to build search queries
    queryModifiers: [
      'concept art',
      'official art', 
      'monster design',
      'creature design',
      'promotional',
      'masahiro ito',                   // Original designer
      'HD',
      'remake',
      'original'
    ],

    // Game-specific modifiers
    gameModifiers: {
      'SH1': ['PS1', 'PlayStation', '1999', 'original'],
      'SH2': ['PS2', 'HD Collection', '2001', 'remake 2024'],
      'SH3': ['PS2', 'HD Collection', '2003'],
      'SH4': ['The Room', 'PS2', '2004'],
      'Origins': ['PSP', 'PS2', '2007'],
      'Homecoming': ['PS3', 'Xbox 360', '2008'],
      'Downpour': ['PS3', 'Xbox 360', '2012'],
      'PT': ['PS4', 'Playable Teaser', '2014']
    },

    // Terms to exclude from searches
    excludeTerms: [
      'minecraft',                      // Avoid minecraft recreations
      'roblox',                         // Avoid roblox versions
      'fortnite',                       // Avoid crossover content
      'dead by daylight',               // Unless specifically wanted
      'fanfic',
      'x reader',
      'meme'                            // Unless collecting memes
    ]
  },

  // Scoring preferences (how to rank images)
  scoring: {
    weights: {
      source: 0.30,                     // 30% - Where it's from
      resolution: 0.25,                 // 25% - Image quality
      relevance: 0.20,                 // 20% - Title/context match
      popularity: 0.15,                 // 15% - Upvotes/views
      age: 0.10                        // 10% - Newer is better
    },

    sourceScores: {
      'silenthill-wiki': 100,
      'silenthill-wiki-gallery': 95,
      'official-site': 100,
      'lost-memories-reference': 100,
      'reddit-silenthill': 80,
      'reddit-horrogaming': 70,
      'reddit-gameart': 75,
      'reddit-other': 60,
      'other': 50
    },

    bonusPoints: {
      hasArtistCredit: 15,
      isConceptArt: 20,
      isOfficialArt: 25,
      isHighRes: 10,
      fromMasahiroIto: 30,             // Original designer
      fromTeamSilent: 25
    }
  },

  // Rate limiting (be respectful!)
  rateLimiting: {
    delayBetweenRequests: 2000,        // 2 seconds
    delayBetweenMonsters: 5000,        // 5 seconds
    delayBetweenSources: 3000,         // 3 seconds
    maxRetriesPerSource: 3,
    backoffMultiplier: 2,              // Double delay on retry
    respectRobotsTxt: true
  },

  // Reddit API Configuration
  reddit: {
    clientId: process.env.REDDIT_CLIENT_ID,
    clientSecret: process.env.REDDIT_CLIENT_SECRET,
    userAgent: 'SilentHillCollector/1.0 (Personal use art collection)',
    rateLimit: {
      requests: 60,                    // Requests per minute
      cooldown: 1000                   // Minimum time between requests
    }
  },

  // Advanced filtering
  filtering: {
    // Skip images with these patterns
    skipPatterns: [
      /wiki\.png$/i,                   // Wiki UI elements
      /button/i,
      /icon/i,
      /cursor/i,
      /ui_element/i,
      /transparent\.gif/i,
      /1x1/i,
      /placeholder/i
    ],

    // Required patterns for certain monsters
    requiredPatterns: {
      'Pyramid Head': [
        /pyramid|red pyramid|triangle/i
      ],
      'Bubble Head Nurse': [
        /nurse|bubble/i
      ],
      'Abstract Daddy': [
        /abstract|daddy|doorman/i
      ]
    },

    // Size limits
    minFileSize: 50 * 1024,           // 50KB minimum
    maxFileSize: 10 * 1024 * 1024     // 10MB maximum
  }
};

// ============================================
// MONSTER DATABASE WITH PREFERENCES
// ============================================

const MONSTER_PREFERENCES = {
  // Priority monsters (collect more images)
  highPriority: [
    {
      name: 'Pyramid Head',
      aliases: ['Red Pyramid Thing', 'Red Pyramid', 'Triangle Head'],
      game: 'SH2',
      maxImages: 25,                   // Collect more for iconic monsters
      preferredSources: ['official', 'wiki', 'masahiro-ito'],
      searchModifiers: ['concept art', 'official art', 'masahiro ito design']
    },
    {
      name: 'Bubble Head Nurse',
      aliases: ['Nurse', 'SH2 Nurse'],
      game: 'SH2', 
      maxImages: 20,
      preferredSources: ['official', 'wiki'],
      searchModifiers: ['concept art', 'hospital', 'medical']
    },
    {
      name: 'Valtiel',
      aliases: ['Attendant', 'Valtiel Closer'],
      game: 'SH3',
      maxImages: 15,
      preferredSources: ['official', 'wiki'],
      searchModifiers: ['concept art', 'religious', 'cult']
    }
  ],

  // Standard monsters
  standard: [
    {
      name: 'Lying Figure',
      aliases: ['Patient'],
      game: 'SH2',
      maxImages: 10
    },
    {
      name: 'Mannequin',
      aliases: ['Mannequin Monster'],
      game: 'SH2',
      maxImages: 10
    },
    {
      name: 'Closer',
      aliases: ['Mandarin'],
      game: 'SH3',
      maxImages: 10
    }
    // ... more monsters
  ],

  // Rare/Boss monsters (harder to find)
  bosses: [
    {
      name: 'Abstract Daddy',
      aliases: ['Doorman', 'Ideal Father'],
      game: 'SH2',
      maxImages: 8,
      searchModifiers: ['boss', 'angela', 'doorway']
    },
    {
      name: 'God',
      aliases: ['Incubator', 'Final Boss'],
      game: 'SH3',
      maxImages: 8,
      searchModifiers: ['final boss', 'deity', 'cult']
    }
  ]
};

// ============================================
// SEARCH STRATEGY PREFERENCES
// ============================================

const SEARCH_STRATEGIES = {
  // Different strategies for different monster types
  strategies: {
    iconic: {
      // For Pyramid Head, Nurses, etc.
      wikiDepth: 'deep',               // Check all related pages
      redditTimeframe: 'all',          // Search all time
      includeVariants: true,           // Include redesigns
      includeFanArt: true,             // High-quality fan art ok
      minScore: 50                     // Higher quality threshold
    },

    standard: {
      // For regular monsters
      wikiDepth: 'normal',
      redditTimeframe: 'year',
      includeVariants: false,
      includeFanArt: false,
      minScore: 20
    },

    rare: {
      // For obscure monsters
      wikiDepth: 'surface',
      redditTimeframe: 'all',
      includeVariants: true,
      includeFanArt: true,             // May need fan art for coverage
      minScore: 5                      // Lower threshold due to rarity
    },

    boss: {
      // For boss monsters
      wikiDepth: 'deep',
      redditTimeframe: 'all',
      includeVariants: false,
      includeFanArt: false,
      minScore: 30
    }
  },

  // How aggressive to be with searching
  aggressiveness: {
    conservative: {
      maxQueries: 3,
      maxPages: 1,
      strictMatching: true
    },
    moderate: {
      maxQueries: 5,
      maxPages: 2,
      strictMatching: false
    },
    aggressive: {
      maxQueries: 10,
      maxPages: 5,
      strictMatching: false
    }
  }
};

// ============================================
// USAGE EXAMPLE
// ============================================

class SilentHillFetcherWithPreferences {
  constructor(customConfig = {}) {
    // Merge custom config with defaults
    this.config = this.mergeConfigs(SILENT_HILL_CONFIG, customConfig);
    this.monsterPrefs = MONSTER_PREFERENCES;
    this.strategies = SEARCH_STRATEGIES;
  }

  // Get preferences for specific monster
  getMonsterPreferences(monsterName) {
    // Check each category
    const allMonsters = [
      ...this.monsterPrefs.highPriority,
      ...this.monsterPrefs.standard,
      ...this.monsterPrefs.bosses
    ];

    const monster = allMonsters.find(m => 
      m.name === monsterName || 
      m.aliases?.includes(monsterName)
    );

    if (monster) {
      // Determine strategy based on category
      let strategy = 'standard';
      if (this.monsterPrefs.highPriority.includes(monster)) {
        strategy = 'iconic';
      } else if (this.monsterPrefs.bosses.includes(monster)) {
        strategy = 'boss';
      }

      return {
        ...monster,
        strategy: this.strategies.strategies[strategy],
        aggressiveness: 'moderate'
      };
    }

    // Default for unknown monsters
    return {
      name: monsterName,
      maxImages: this.config.output.maxImagesPerMonster,
      strategy: this.strategies.strategies.standard,
      aggressiveness: 'conservative'
    };
  }

  // Build search query with preferences
  buildSearchQuery(monster, source = 'wiki') {
    const prefs = this.getMonsterPreferences(monster);
    const queries = [];

    // Base query
    queries.push(monster);

    // Add aliases
    if (prefs.aliases) {
      queries.push(...prefs.aliases);
    }

    // Add game-specific modifiers
    if (prefs.game && this.config.searchPreferences.gameModifiers[prefs.game]) {
      const gameModifiers = this.config.searchPreferences.gameModifiers[prefs.game];
      queries.push(`${monster} ${gameModifiers[0]}`);
    }

    // Add search modifiers based on preferences
    if (prefs.searchModifiers) {
      for (const modifier of prefs.searchModifiers) {
        queries.push(`${monster} ${modifier}`);
      }
    } else {
      // Use default modifiers
      for (const modifier of this.config.searchPreferences.queryModifiers.slice(0, 3)) {
        queries.push(`${monster} ${modifier}`);
      }
    }

    // Filter out excluded terms
    return queries.map(q => {
      let filtered = q;
      for (const exclude of this.config.searchPreferences.excludeTerms) {
        filtered = filtered.replace(new RegExp(exclude, 'gi'), '');
      }
      return filtered.trim();
    });
  }

  // Score image based on preferences
  scoreImage(image, monsterName) {
    const prefs = this.getMonsterPreferences(monsterName);
    let score = 0;

    // Source scoring
    const sourceScore = this.config.scoring.sourceScores[image.source] || 50;
    score += sourceScore * this.config.scoring.weights.source;

    // Resolution scoring
    if (image.width && image.height) {
      const pixels = image.width * image.height;
      const idealPixels = this.config.imageQuality.preferredResolution.width * 
                         this.config.imageQuality.preferredResolution.height;
      const resScore = Math.min(100, (pixels / idealPixels) * 100);
      score += resScore * this.config.scoring.weights.resolution;
    }

    // Relevance scoring
    const title = (image.title || '').toLowerCase();
    const context = (image.context || '').toLowerCase();
    let relevanceScore = 0;

    if (title.includes(monsterName.toLowerCase())) relevanceScore += 50;
    if (context.includes(monsterName.toLowerCase())) relevanceScore += 30;
    
    // Check for preferred terms
    if (prefs.searchModifiers) {
      for (const modifier of prefs.searchModifiers) {
        if (title.includes(modifier.toLowerCase()) || 
            context.includes(modifier.toLowerCase())) {
          relevanceScore += 20;
        }
      }
    }

    score += relevanceScore * this.config.scoring.weights.relevance;

    // Apply bonus points
    if (image.artist?.toLowerCase().includes('masahiro ito')) {
      score += this.config.scoring.bonusPoints.fromMasahiroIto;
    }
    if (context.includes('concept')) {
      score += this.config.scoring.bonusPoints.isConceptArt;
    }
    if (context.includes('official')) {
      score += this.config.scoring.bonusPoints.isOfficialArt;
    }

    // Popularity (Reddit scores)
    if (image.redditScore) {
      const popScore = Math.min(100, image.redditScore / 10);
      score += popScore * this.config.scoring.weights.popularity;
    }

    return score;
  }

  // Merge configurations
  mergeConfigs(base, custom) {
    return {
      ...base,
      ...custom,
      output: { ...base.output, ...custom.output },
      imageQuality: { ...base.imageQuality, ...custom.imageQuality },
      sources: { ...base.sources, ...custom.sources },
      searchPreferences: { ...base.searchPreferences, ...custom.searchPreferences },
      scoring: { ...base.scoring, ...custom.scoring },
      rateLimiting: { ...base.rateLimiting, ...custom.rateLimiting },
      filtering: { ...base.filtering, ...custom.filtering }
    };
  }
}

// ============================================
// EXPORT CONFIGURATIONS
// ============================================

export {
  SILENT_HILL_CONFIG,
  MONSTER_PREFERENCES,
  SEARCH_STRATEGIES,
  SilentHillFetcherWithPreferences
};

// Example: Custom configuration for specific needs
export const CUSTOM_CONFIGS = {
  // High quality collection
  highQuality: {
    imageQuality: {
      minResolution: { width: 1920, height: 1080 },
      jpegQuality: 95
    },
    output: {
      maxImagesPerMonster: 30
    }
  },

  // Quick collection
  quick: {
    output: {
      maxImagesPerMonster: 5
    },
    sources: {
      reddit: { enabled: false },      // Wiki only for speed
      officialSites: { enabled: false }
    },
    rateLimiting: {
      delayBetweenRequests: 1000
    }
  },

  // Reddit focused
  redditFocus: {
    sources: {
      silentHillWiki: { enabled: false },
      reddit: { 
        enabled: true,
        priority: 10
      },
      officialSites: { enabled: false }
    }
  },

  // Concept art only
  conceptArtOnly: {
    searchPreferences: {
      queryModifiers: ['concept art', 'masahiro ito', 'official design']
    },
    filtering: {
      requiredPatterns: {
        '_all': [/concept|design|sketch|draft/i]
      }
    }
  }
};