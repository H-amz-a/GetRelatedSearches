// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const { url } = require("inspector");
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());

// puppeteer usage as normal
const getRelatedSearches = async (url) => {
  const browser = await puppeteer.launch();
  console.log("Starting Script");
  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForSelector(".EIaa9b", { timeout: 30000 });
  const relatedSearchesData = await page.evaluate(() => {
    const relatedSearchTable = document.querySelector(".EIaa9b");
    const searches = relatedSearchTable.querySelectorAll(".AJLUJb > div > a");
    const searchesArr = [];
    for (let i = 0; i < searches.length; i++) {
      searchesArr.push({
        content: searches[i].textContent,
        url: searches[i].href,
      });
    }
    return searchesArr;
  });
  console.log(relatedSearchesData);
  console.log("finished execution");
  await browser.close();
  return relatedSearchesData;
};
getRelatedSearches("https://www.google.com/search?q=iphone&gl=us&hl=en&pws=0");
