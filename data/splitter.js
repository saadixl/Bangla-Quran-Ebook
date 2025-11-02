const fs = require('fs');
const path = require('path');

// Bangla phonetic names array (indexed from 1)
const suraBanglaPhoneticNames = [
  'আল-ফাতিহা', 'আল-বাকারা', 'আল-ইমরান', 'নিসা', 'আল-মায়িদাহ', 'আল-আনাম',
  'আল-আরাফ', 'আল-আনফাল', 'আত-তাওবাহ', 'ইউনুস', 'হুদ', 'ইউসুফ', 'আর-রাদ',
  'ইবরাহীম', 'আল-হিজর', 'আন-নাহল', 'বনি ইসরাইল', 'আল-কাহফ', 'মারিয়াম', 'ত্বা হা',
  'আল-আম্বিয়া', 'আল-হাজ্ব', 'আল-মুমিনুন', 'আন-নূর', 'আল-ফুরকান', 'আশ-শুআরা',
  'আন-নমল', 'আল-কাসাস', 'আল-আনকাবুত', 'আল-রুম', 'লুকমান', 'আস-সাজদাহ',
  'আল-আহযাব', 'আস-সাবা', 'আল-ফাতির', 'ইয়া সিন', 'আস-সাফফাত', 'সোয়াদ',
  'আয-যুমার', 'আল-মুমিন', 'হামিম সাজদাহ', 'আশ-শূরা', 'আয-যুখরুফ', 'আদ-দুখান',
  'আল-জাসিয়াহ', 'আল-আহকাফ', 'মুহাম্মদ [নবী মুহাম্মদ স:]', 'আল-ফাতহ', 'আল-হুজুরাত',
  'ক্বাফ', 'আয-যারিয়াত', 'আত-তুর', 'আন-নাজম', 'আল-ক্বমর', 'আর-রাহমান', 'আল-ওয়াকিয়াহ',
  'আল-হাদিদ', 'আল-মুজাদিলাহ', 'আল-হাশর', 'আল-মুমতাহানা', 'আস-সাফ', 'আল-জুমুআহ',
  'আল-মুনাফিকুন', 'আত-তাগাবুন', 'আত-ত্বালাক', 'আত-তাহরীম', 'আল-মুলক', 'আল-ক্বলম',
  'আল-হাক্ক্বাহ', 'আল-মাআরিজ', 'নূহ', 'আল-জ্বিন', 'মুযাম্মিল', 'মুদাসসির',
  'আল-কিয়ামাহ', 'আল-ইনসান', 'আল-মুরসালাত', 'আন-নাবা', 'আন-নাযিয়াত', 'আবাসা',
  'আত-তাকবির', 'আল-ইনফিতার', 'আত-তাতফিক', 'আল-ইনশিকাক', 'আল-বুরুজ', 'আত-তারিক',
  'আল-আলা', 'আল-গাশিয়াহ', 'আল-ফজর', 'আল-বালাদ', 'আশ-শামস', 'আল-লাইল', 'আদ-দুহা',
  'আল-ইনশিরাহ', 'আত-তীন', 'আল-আলাক', 'আল-ক্বাদর', 'আল-বাইয়িনাহ', 'আল-যিলযাল',
  'আল-আদিয়াত', 'আল-কারিয়াহ', 'আত-তাকাছুর', 'আল-আসর', 'আল-হুমাযাহ', 'ফীল',
  'আল-কুরাইশ', 'আল-মাউন', 'আল-কাওসার', 'আল-কাফিরুন', 'আন-নাসর', 'লাহাব',
  'আল-ইখলাস', 'আল-ফালাক', 'আন-নাস'
];

// Input and output paths
const inputPath = path.join(__dirname, './bangla-quran.json');
const outputDir = path.join(__dirname, './suras');

// Read and parse main JSON
const data = JSON.parse(fs.readFileSync(inputPath, 'utf8'));

// Create output directory if it doesn’t exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Generate sura files
data.forEach((sura) => {
  const suraId = sura.id;
  const suraData = {
    id: suraId,
    name: sura.name,
    translation: sura.translation,
    bangla_name: suraBanglaPhoneticNames[suraId - 1] || '',
    verses: sura.verses.map((v) => v.translation),
  };

  const outputPath = path.join(outputDir, `${suraId}.json`);
  fs.writeFileSync(outputPath, JSON.stringify(suraData, null, 2), 'utf8');
  console.log(`✅ Created ${suraId}.json (${suraData.bangla_name})`);
});

console.log('🎉 All sura files created successfully!');
