const quranJson = require('../data/bangla-quran.json');
const fs = require('fs');
const path = require('path');

function main() {
    // Read the empty HTML file
    let canvas = fs.readFileSync(path.resolve(__dirname, '../data/canvas.html'), 'utf8');
    let mainEl = '<main>';
    // Traverse all suras
    quranJson.forEach((sura) => {
        const {
            id, transliteration, translation, verses
        } = sura;
        const titlePresentation = `${id}. ${transliteration.trim()} (${translation.trim()})`;
        // Create a new section for a sura and place the title
        let sectionEl = `<section><h2>${titlePresentation}</h2>`;
        // Traverse all verses
        verses.forEach((verse) => {
            const { id, translation } = verse;
            const versePresentation = `${id}. ${translation}`;
            // Insert verses in the section
            sectionEl += `<p>${versePresentation}</p>`;
        });
        sectionEl += `</section><br/><br/>`;
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