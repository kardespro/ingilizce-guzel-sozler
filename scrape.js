const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.englishcentral.com/blog/ingilizce-guzel-sozler-ve-turkce-anlamlari/"; 

axios
  .get(url)
  .then((response) => {
    const html = response.data;

    const $ = cheerio.load(html);

    const blockquoteData = [];

    $("blockquote").each((index, element) => {
      const blockquoteContent = $(element).find("p").text();

      blockquoteData.push(blockquoteContent);
    });

    const jsonData = JSON.stringify(blockquoteData, null, 2);

    fs.writeFileSync("data.json", jsonData);
    console.log('Veriler "data.json" dosyasına yazıldı.');
  })
  .catch((error) => {
    console.error("Hata:", error);
  });
