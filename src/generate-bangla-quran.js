const quranJson = require('../data/bangla-quran.json');
const fs = require('fs');
const path = require('path');

const banglaDigitMap = {
    '0': '০',
    '1': '১',
    '2': '২',
    '3': '৩',
    '4': '৪',
    '5': '৫',
    '6': '৬',
    '7': '৭',
    '8': '৮',
    '9': '৯'
};

const suraBanglaPhoneticNames = ['আল-ফাতিহা', 'আল-বাকারা', 'আল-ইমরান', 'নিসা', 'আল-মায়িদাহ', 'আল-আনাম', 'আল-আরাফ', 'আল-আনফাল', 'আত-তাওবাহ', 'ইউনুস', 'হুদ', 'ইউসুফ', 'আর-রাদ', 'ইবরাহীম', 'আল-হিজর', 'আন-নাহল', 'বনি ইসরাইল', 'আল-কাহফ', 'মারিয়াম', 'ত্বা হা', 'আল-আম্বিয়া', 'আল-হাজ্ব', 'আল-মুমিনুন', 'আন-নূর', 'আল-ফুরকান', 'আশ-শুআরা', 'আন-নমল', 'আল-কাসাস', 'আল-আনকাবুত', 'আল-রুম', 'লুকমান', 'আস-সাজদাহ', 'আল-আহযাব', 'আস-সাবা', 'আল-ফাতির', 'ইয়া সিন', 'আস-সাফফাত', 'সোয়াদ', 'আয-যুমার', 'আল-মুমিন', 'হামিম সাজদাহ', 'আশ-শূরা', 'আয-যুখরুফ', 'আদ-দুখান', 'আল-জাসিয়াহ', 'আল-আহকাফ', 'মুহাম্মদ [নবী মুহাম্মদ স:]', 'আল-ফাতহ', 'আল-হুজুরাত', 'ক্বাফ', 'আয-যারিয়াত', 'আত-তুর', 'আন-নাজম', 'আল-ক্বমর', 'আর-রাহমান', 'আল-ওয়াকিয়াহ', 'আল-হাদিদ', 'আল-মুজাদিলাহ', 'আল-হাশর', 'আল-মুমতাহানা', 'আস-সাফ', 'আল-জুমুআহ', 'আল-মুনাফিকুন', 'আত-তাগাবুন', 'আত-ত্বালাক', 'আত-তাহরীম', 'আল-মুলক', 'আল-ক্বলম', 'আল-হাক্ক্বাহ', 'আল-মাআরিজ', 'নূহ', 'আল-জ্বিন', 'মুযাম্মিল', 'মুদাসসির', 'আল-কিয়ামাহ', 'আল-ইনসান', 'আল-মুরসালাত', 'আন-নাবা', 'আন-নাযিয়াত', 'আবাসা', 'আত-তাকবির', 'আল-ইনফিতার', 'আত-তাতফিক', 'আল-ইনশিকাক', 'আল-বুরুজ', 'আত-তারিক', 'আল-আলা', 'আল-গাশিয়াহ', 'আল-ফজর', 'আল-বালাদ', 'আশ-শামস', 'আল-লাইল', 'আদ-দুহা', 'আল-ইনশিরাহ', 'আত-তীন', 'আল-আলাক', 'আল-ক্বাদর', 'আল-বাইয়িনাহ', 'আল-যিলযাল', 'আল-আদিয়াত', 'আল-কারিয়াহ', 'আত-তাকাছুর', 'আল-আসর', 'আল-হুমাযাহ', 'ফীল', 'আল-কুরাইশ', 'আল-মাউন', 'আল-কাওসার', 'আল-কাফিরুন', 'আন-নাসর', 'লাহাব', 'আল-ইখলাস', 'আল-ফালাক', 'আন-নাস'];

function convertNumberToBangla(id) {
    return id.toString().split("").map((engDigit) => {
        return banglaDigitMap[engDigit];
    }).join("");
}

function main() {
    // Read the empty HTML file
    let canvas = fs.readFileSync(path.resolve(__dirname, '../data/canvas.html'), 'utf8');

    // Creating the index
    let indexElement = `<section><h1>সূচিপত্র</h1>`;
    quranJson.forEach((sura, i) => {
        const { id, translation } = sura;
        const indexItemTitle = `${convertNumberToBangla(id)}. ${suraBanglaPhoneticNames[i]} (${translation.trim()})`;
        indexElement += `<p><a href="#${id}">${indexItemTitle}</a></p>`
    });

    indexElement += '</section><br /><br/>';
    let mainEl = `<main>${indexElement}`;
    // Traverse all suras
    quranJson.forEach((sura, i) => {
        const { id, translation, verses } = sura;
        const titlePresentation = `${convertNumberToBangla(id)}. ${suraBanglaPhoneticNames[i]}`;
        const metadataPresentation = `<strong><p>সূরার নামের অর্থ: ${translation.trim()}<br/>আয়াত সংখ্যা: ${convertNumberToBangla(verses.length)}</p></strong>`;
        // Create a new section for a sura and place the title
        let sectionEl = `<section id="${id}"><h2>${titlePresentation}</h2>${metadataPresentation}`;
        // Traverse all verses
        verses.forEach((verse) => {
            const { id, translation } = verse;
            const versePresentation = `${convertNumberToBangla(id)}. ${translation}`;
            // Insert verses in the section
            sectionEl += `<p>${versePresentation}</p>`;
        });
        sectionEl += '</section><br/><br/>';
        mainEl += sectionEl;
    });
    mainEl += '</main>';
    const quranOnCanvas = canvas.replace("%%%", mainEl);
    console.log(quranOnCanvas);
    fs.writeFileSync(
        path.resolve(__dirname, '../dist/bangla-quran.html'),
        quranOnCanvas,
        { encoding: 'utf8', flag: 'w' }
    );
    console.log("Completed!");
}

main();