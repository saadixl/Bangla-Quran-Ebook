const quranJson = require('../data/bangla-quran.json');

function main() {
    quranJson.forEach((sura) => {
        const {
            id, transliteration, translation, verses
        } = sura;
        const titlePresentation = `${id}. ${transliteration.trim()} (${translation.trim()})`;
        console.log(titlePresentation);
        verses.forEach((verse) => {
            const { id, translation } = verse;
            const versePresentation = `${id}. ${translation}`;
            console.log(versePresentation);
        });
    });
}

main();