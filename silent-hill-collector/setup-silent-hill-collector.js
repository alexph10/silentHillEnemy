// setup-silent-hill-fetcher.js
// Setup and configuration for Silent Hill image collection

import SilentHillImageFetcher from './silent-hill-image-fetcher.js';
import dotenv from 'dotenv';
import readline from 'readline';
import fs from 'fs/promises';

dotenv.config();

// Interactive setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function interactiveSetup() {
  console.log('Silent Hill Image Collection Setup');
  console.log('===================================\n');
  
  console.log('This tool will collect images from:');
  console.log('- Silent Hill Wiki (Fandom)');
  console.log('- Reddit communities (r/silenthill, etc.)');
  console.log('- Known Silent Hill resource sites\n');
  
  console.log('⚠️  IMPORTANT LEGAL NOTES:');
  console.log('- This tool is for personal use and fan projects only');
  console.log('- Always credit original artists and sources');
  console.log('- Respect copyright - these images belong to Konami');
  console.log('- Do not use for commercial purposes\n');
  
  const confirm = await question('Do you understand and agree? (yes/no): ');
  if (confirm.toLowerCase() !== 'yes') {
    console.log('Setup cancelled.');
    process.exit(0);
  }
  
  console.log('\n--- Reddit API Setup ---');
  console.log('To search Reddit, you need API credentials (free):');
  console.log('1. Go to: https://www.reddit.com/prefs/apps');
  console.log('2. Click "Create App" at the bottom');
  console.log('3. Choose "script" type');
  console.log('4. Use http://localhost:8080 as redirect URI');
  console.log('5. Copy your client ID and secret\n');
  
  const hasReddit = await question('Do you have Reddit API credentials? (yes/no): ');
  
  let redditClientId = null;
  let redditClientSecret = null;
  
  if (hasReddit.toLowerCase() === 'yes') {
    redditClientId = await question('Enter Reddit Client ID: ');
    redditClientSecret = await question('Enter Reddit Client Secret: ');
  }
  
  console.log('\n--- Collection Options ---');
  
  const customMonster = await question('Enter monster name (or press Enter for default list): ');
  const gameVersion = await question('Enter game version (e.g., SH2, SH3) or press Enter for all: ');
  const maxImages = await question('Max images per monster (default 10): ') || '10';
  
  rl.close();
  
  return {
    redditClientId,
    redditClientSecret,
    customMonster,
    gameVersion,
    maxImages: parseInt(maxImages)
  };
}

// Preset monster collections
const collections = {
  sh1: [
    'Grey Child',
    'Air Screamer', 
    'Romper',
    'Puppet Nurse',
    'Puppet Doctor',
    'Larval Stalker',
    'Creeper',
    'Hanged Scratcher',
    'Incubator'
  ],
  sh2: [
    'Pyramid Head',
    'Lying Figure',
    'Mannequin',
    'Bubble Head Nurse',
    'Creeper',
    'Abstract Daddy',
    'Mandarin',
    'Flesh Lips',
    'Mary'
  ],
  sh3: [
    'Closer',
    'Double Head',
    'Insane Cancer',
    'Numb Body',
    'Nurse',
    'Pendulum',
    'Slurper',
    'Split Head',
    'Valtiel',
    'Missionary'
  ],
  sh4: [
    'Sniffer Dog',
    'Wall Man',
    'Twin Victim',
    'Patient',
    'Gum Head',
    'Tremor',
    'Wheelchair',
    'Bottom',
    'Walter Sullivan'
  ],
  homecoming: [
    'Smog',
    'Feral',
    'Lurker',
    'Needler',
    'Schism',
    'Siam',
    'Swarm'
  ],
  downpour: [
    'Screamer',
    'Brawler',
    'Prisoner Minion',
    'Prisoner Juggernaut',
    'Doll',
    'Weeping Bat',
    'Bogeyman',
    'Wheelman'
  ],
  origins: [
    'Straight-jacket',
    'Carrion',
    'Remnant',
    'Caliban',
    'Arioch',
    'Twoback'
  ],
  shatteredMemories: [
    'Raw Shock',
    'Larval Stalker'
  ]
};

// Automated collection runner
async function runAutomatedCollection(config = {}) {
  console.log('\nStarting Automated Collection');
  console.log('==============================\n');
  
  const fetcher = new SilentHillImageFetcher({
    outputDir: './silent-hill-collection',
    maxImagesPerMonster: config.maxImages || 10,
    minResolution: { width: 800, height: 600 },
    redditClientId: config.redditClientId || process.env.REDDIT_CLIENT_ID,
    redditClientSecret: config.redditClientSecret || process.env.REDDIT_CLIENT_SECRET,
    userAgent: 'SilentHillCollector/1.0',
    sources: {
      wiki: true,
      reddit: !!config.redditClientId,
      officialSites: true
    },
    rateLimit: 3000 // Be respectful
  });

  // Determine what to collect
  let monstersToCollect = [];
  
  if (config.customMonster) {
    monstersToCollect = [{
      name: config.customMonster,
      game: config.gameVersion || null
    }];
  } else if (config.gameVersion && collections[config.gameVersion.toLowerCase()]) {
    // Collect all monsters from specific game
    monstersToCollect = collections[config.gameVersion.toLowerCase()].map(name => ({
      name,
      game: config.gameVersion.toUpperCase()
    }));
  } else {
    // Default collection - iconic monsters
    monstersToCollect = [
      { name: 'Pyramid Head', game: 'SH2' },
      { name: 'Bubble Head Nurse', game: 'SH2' },
      { name: 'Lying Figure', game: 'SH2' },
      { name: 'Grey Child', game: 'SH1' },
      { name: 'Closer', game: 'SH3' },
      { name: 'Valtiel', game: 'SH3' },
      { name: 'Twin Victim', game: 'SH4' },
      { name: 'Schism', game: 'Homecoming' }
    ];
  }
  
  console.log(`Collecting ${monstersToCollect.length} monster(s)...\n`);
  
  const results = {
    successful: [],
    failed: [],
    totalImages: 0
  };
  
  for (let i = 0; i < monstersToCollect.length; i++) {
    const monster = monstersToCollect[i];
    console.log(`[${i + 1}/${monstersToCollect.length}] ${monster.name} (${monster.game || 'All games'})`);
    console.log('─'.repeat(50));
    
    try {
      const images = await fetcher.fetchMonsterImages(monster.name, monster.game);
      
      results.successful.push({
        name: monster.name,
        game: monster.game,
        imageCount: images.length
      });
      
      results.totalImages += images.length;
      
    } catch (error) {
      console.error(`✗ Error collecting ${monster.name}: ${error.message}`);
      results.failed.push({
        name: monster.name,
        error: error.message
      });
    }
    
    // Progress indicator
    if (i < monstersToCollect.length - 1) {
      console.log(`\n⏳ Waiting before next monster...\n`);
      await new Promise(resolve => setTimeout(resolve, 5000));
    }
  }
  
  // Final report
  console.log('\n' + '='.repeat(60));
  console.log('COLLECTION COMPLETE');
  console.log('='.repeat(60));
  console.log(`✓ Successful: ${results.successful.length} monsters`);
  console.log(`✓ Total images: ${results.totalImages}`);
  
  if (results.failed.length > 0) {
    console.log(`\n✗ Failed: ${results.failed.length} monsters`);
    results.failed.forEach(f => {
      console.log(`  - ${f.name}: ${f.error}`);
    });
  }
  
  console.log(`\n📁 Images saved to: ./silent-hill-collection/`);
  
  // Save collection report
  const reportPath = './silent-hill-collection/collection-report.json';
  await fs.writeFile(reportPath, JSON.stringify({
    timestamp: new Date().toISOString(),
    config: {
      maxImages: config.maxImages,
      hadRedditAccess: !!config.redditClientId
    },
    results
  }, null, 2));
  
  console.log(`📄 Report saved to: ${reportPath}`);
}

// Quick start presets
async function quickStart() {
  console.log('\nSilent Hill Image Collector - Quick Start');
  console.log('==========================================\n');
  
  console.log('Choose an option:');
  console.log('1. Collect iconic monsters (no Reddit API needed)');
  console.log('2. Collect all SH2 monsters');
  console.log('3. Collect all SH3 monsters'); 
  console.log('4. Interactive setup (custom options)');
  console.log('5. Single monster search\n');
  
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  
  const choice = await new Promise(resolve => 
    rl.question('Enter choice (1-5): ', resolve)
  );
  
  rl.close();
  
  switch (choice) {
    case '1':
      await runAutomatedCollection({
        maxImages: 10
      });
      break;
      
    case '2':
      await runAutomatedCollection({
        gameVersion: 'sh2',
        maxImages: 10
      });
      break;
      
    case '3':
      await runAutomatedCollection({
        gameVersion: 'sh3',
        maxImages: 10
      });
      break;
      
    case '4':
      const config = await interactiveSetup();
      await runAutomatedCollection(config);
      break;
      
    case '5':
      const rl2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const monsterName = await new Promise(resolve =>
        rl2.question('Enter monster name: ', resolve)
      );
      
      rl2.close();
      
      await runAutomatedCollection({
        customMonster: monsterName,
        maxImages: 15
      });
      break;
      
    default:
      console.log('Invalid choice. Exiting.');
      process.exit(1);
  }
}

// Create .env template
async function createEnvTemplate() {
  const envTemplate = `# Reddit API Credentials (optional but recommended)
# Get these from: https://www.reddit.com/prefs/apps
REDDIT_CLIENT_ID=your_client_id_here
REDDIT_CLIENT_SECRET=your_client_secret_here

# Optional: Custom output directory
# OUTPUT_DIR=./my-silent-hill-collection
`;

  try {
    await fs.access('.env');
    console.log('.env file already exists');
  } catch {
    await fs.writeFile('.env', envTemplate);
    console.log('Created .env template file');
  }
}

// Main entry point
async function main() {
  // Create .env template if it doesn't exist
  await createEnvTemplate();
  
  // Check command line arguments
  const args = process.argv.slice(2);
  
  if (args.includes('--help') || args.includes('-h')) {
    console.log(`
Silent Hill Image Collector

Usage:
  node setup-silent-hill-fetcher.js [options]

Options:
  --quick           Run quick start menu
  --monster NAME    Collect specific monster
  --game GAME       Specify game (sh1, sh2, sh3, sh4, etc.)
  --max NUMBER      Maximum images per monster (default: 10)
  --help            Show this help message

Examples:
  node setup-silent-hill-fetcher.js --quick
  node setup-silent-hill-fetcher.js --monster "Pyramid Head" --game sh2
  node setup-silent-hill-fetcher.js --game sh3 --max 20

Environment Variables:
  Set these in .env file:
  REDDIT_CLIENT_ID      Reddit API client ID
  REDDIT_CLIENT_SECRET  Reddit API client secret
    `);
    process.exit(0);
  }
  
  // Parse command line options
  if (args.includes('--monster')) {
    const monsterIndex = args.indexOf('--monster');
    const monsterName = args[monsterIndex + 1];
    const gameIndex = args.indexOf('--game');
    const gameVersion = gameIndex >= 0 ? args[gameIndex + 1] : null;
    const maxIndex = args.indexOf('--max');
    const maxImages = maxIndex >= 0 ? parseInt(args[maxIndex + 1]) : 10;
    
    await runAutomatedCollection({
      customMonster: monsterName,
      gameVersion,
      maxImages,
      redditClientId: process.env.REDDIT_CLIENT_ID,
      redditClientSecret: process.env.REDDIT_CLIENT_SECRET
    });
    
  } else if (args.includes('--game')) {
    const gameIndex = args.indexOf('--game');
    const gameVersion = args[gameIndex + 1];
    const maxIndex = args.indexOf('--max');
    const maxImages = maxIndex >= 0 ? parseInt(args[maxIndex + 1]) : 10;
    
    await runAutomatedCollection({
      gameVersion,
      maxImages,
      redditClientId: process.env.REDDIT_CLIENT_ID,
      redditClientSecret: process.env.REDDIT_CLIENT_SECRET
    });
    
  } else {
    // Default to quick start menu
    await quickStart();
  }
}

// Run the setup
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
    .then(() => {
      console.log('\n✨ Done! Happy collecting!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n❌ Error:', error);
      process.exit(1);
    });
}