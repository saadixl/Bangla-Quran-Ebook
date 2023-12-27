# Why this project exists?
I failed to find a Bangla Quran Ebook which can be read with Kindle properly. There are some PDFs available but not what I am looking for. That's why I have decided to start creating a Bangla Quran eBook which can be read in Kindle properly.

# How to generate?
You need to have node.js in your machine first. Then pull this repo in your machine. Then from the root run `node src/index`. This should generate the `dist/bangla-quran.html`. I don't have epub generator yet. So for now I am using [https://convertio.co/html-epub/](https://convertio.co/html-epub/) to convert the HTML file to EPUB. Then for Kindle, I used [https://cloudconvert.com/epub-to-mobi](https://cloudconvert.com/epub-to-mobi) to convert into MOBI since Kindle can't render EPUB files. Insha Allah soon I will be adding my own EPUB & MOBI generator in this repo.

# Acknowledgements
I have collected the Bangla Quran json from (https://github.com/risan/quran-json)[https://github.com/risan/quran-json] repo. The download link for the file was (https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_bn.json)[https://cdn.jsdelivr.net/npm/quran-json@3.1.2/dist/quran_bn.json]. My understanding is that the source of the translation and transliteration is [https://tanzil.net](https://tanzil.net).

**The source json file is untouched. I am just using them to create a eBook. If you find any issue or mistakes, please create an issue in this repo.**

**The project is a work in progress**
