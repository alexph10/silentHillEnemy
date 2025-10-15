from icrawler.builtin import BingImageCrawler
import os
from pathlib import Path

monsters = [
    "Silent Hill Pyramid Head",
    "Silent Hill Red Pyramid Thing",
    "Silent Hill nurse monster",
    "Silent Hill Bubble Head Nurse",
    "Silent Hill Lying Figure",
    "Silent Hill Straightjacket monster",
    "Silent Hill Mannequin monster",
    "Silent Hill Abstract Daddy",
    
    
    "Silent Hill Grey Children",
    "Silent Hill Groaner dog",
    "Silent Hill Wormhead",
    "Silent Hill Air Screamer",
    "Silent Hill Night Flutter",
    "Silent Hill Creeper insect",
    "Silent Hill Hanged Scratcher",
    "Silent Hill Split Head boss",
    "Silent Hill Bloodsucker",
    "Silent Hill Puppet Nurse",
    
    
    "Silent Hill 2 Lying Figure",
    "Silent Hill 2 Mannequin",
    "Silent Hill 2 Bubble Head Nurse",
    "Silent Hill Mandarin monster",  
    "Silent Hill Flesh Lips",
    "Silent Hill 2 Abstract Daddy",
    
    
    "Silent Hill Closer monster",
    "Silent Hill Double Head dog",
    "Silent Hill Scraper monster",
    "Silent Hill Insane Cancer",
    "Silent Hill Pendulum monster",
    "Silent Hill Numb Body",
    "Silent Hill Missionary",
    "Silent Hill Valtiel",
    "Silent Hill Glutton",
    "Silent Hill 3 Nurse",
    
    
    "Silent Hill Twin Victim",
    "Silent Hill Doublehead monster",
    "Silent Hill Gumhead",
    "Silent Hill Wall Man",
    "Silent Hill Patient wheelchair",
    
    
    "Silent Hill Schism monster",
    "Silent Hill Lurker monster",
    "Silent Hill Siam monster",
    "Silent Hill Needler",
    "Silent Hill Asphyxia boss",
    "Silent Hill Sepulcher",
    
    
    "Silent Hill f Kashimashi",  
    "Silent Hill f Ayakakashi",  
    "Silent Hill f Yuurei",
    "Silent Hill f Hakidasu",
    "Silent Hill f Umibozu",
    "Silent Hill f Shackled Monster",
    "Silent Hill f Ningyou",
    "Silent Hill f Katashiro",
    
    
    "Silent Hill creature design",
    "Silent Hill monster concept art",
    "Silent Hill enemy",
    "Silent Hill boss monster",
    "Silent Hill horror creature",
    "Silent Hill demon"
]

print("="*60)
print("SILENT HILL MONSTER IMAGE DOWNLOADER")
print("="*60)
print(f"Total searches: {len(monsters)}")
print(f"Images per search: 50")
print(f"Expected total: ~{len(monsters) * 50} images")
print(f"Estimated time: 25-30 minutes")
print("="*60)
print()

# Create output directory
output_base = 'data/raw/bing'
os.makedirs(output_base, exist_ok=True)

for i, query in enumerate(monsters, 1):
    print(f"[{i}/{len(monsters)}] Downloading: {query}")
    
    # Create subfolder for this search
    output_dir = os.path.join(output_base, query.replace(' ', '_'))
    
    try:
        crawler = BingImageCrawler(
            storage={'root_dir': output_dir}
        )
        
        crawler.crawl(
            keyword=query,
            max_num=50,
            min_size=(200, 200),  # Minimum image size
        )
        
        print(f"  ✓ Completed\n")
        
    except Exception as e:
        print(f"  ❌ Error: {e}\n")
        continue

print("="*60)
print("✓ DOWNLOAD COMPLETE!")
print(f"✓ Images saved to: {output_base}/")
print("="*60)