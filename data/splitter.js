const fs = require('fs');
const path = require('path');

// Path to your main JSON file
const inputPath = path.join(__dirname, './bangla-quran.json');

// Read and parse the main JSON file
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Output directory for individual sura files
const outputDir = path.join(__dirname, './suras');

// Create the output directory if not exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Loop through each sura and create a new file with only translations
data.forEach((sura) => {
  const suraData = {
    id: sura.id,
    name: sura.name,
    translation: sura.translation,
    verses: sura.verses.map((v) => v.translation),
  };

  const outputPath = path.join(outputDir, `${sura.id}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(suraData, null, 2), 'utf8');
  console.log(`✅ Created ${sura.id}.json`);
});

console.log('🎉 All sura files created successfully!');
