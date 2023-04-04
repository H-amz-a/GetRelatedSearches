// puppeteer-extra is a drop-in replacement for puppeteer,
// it augments the installed puppeteer with plugin functionality
const puppeteer = require("puppeteer-extra");

// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const getData = async (puppeteer, url) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
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
  } catch (error) {
    console.log("something went wrong " + error.message);
  }
};
// puppeteer usage as normal
const getRelatedSearches = async (urls = []) => {
  try {
    if (!urls) return;
    let dataList = [];
    for (let i = 0; i < urls.length; i++) {
      dataList.push(await getData(puppeteer, urls[i]));
      console.log(i);
    }
    console.log(dataList.flat());
    return dataList.flat();
  } catch (e) {
    console.log("something went wrong :");
    console.log(e.message);
  }
};
const urls = [
  "https://www.google.com/search?q=anime&oq=anime&aqs=chrome..69i57j69i59l3j69i60l3j69i65.654j0j7&sourceid=chrome&ie=UTF-8",
  "https://www.google.com/search?q=iphone&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=samsung&sxsrf=APwXEdcWQljRrWkxDHavdEH24qLS1pFzNw%3A1680619499038&ei=6zcsZNztAfvP7_UPgJahkAQ&ved=0ahUKEwicj_jBu5D-AhX757sIHQBLCEIQ4dUDCA8&uact=5&oq=samsung&gs_lcp=Cgxnd3Mtd2l6LXNlcnAQAzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIHCAAQigUQQzIKCAAQigUQsQMQQzIKCAAQigUQsQMQQzoHCCMQsAMQJzoKCAAQRxDWBBCwAzoHCCMQ6gIQJzoPCAAQigUQ6gIQtAIQQxgBOg0IABCPARDqAhC0AhgCOg0ILhCPARDqAhC0AhgCOgQIIxAnOgsIABCABBCxAxCDAToICAAQgAQQsQM6CgguEIoFENQCEEM6CgguEIoFEEMQ6gQ6BwguEIoFEEM6FQguEIoFEEMQ6gQQ3AQQ3gQQ4AQYA0oECEEYAFDJBljjKmDdLGgCcAF4AIAByQSIAdwSkgEJMi0yLjEuMS4ymAEAoAEBsAEUyAEKwAEB2gEGCAEQARgB2gEGCAIQARgK2gEGCAMQARgU&sclient=gws-wiz-serp",
  "https://www.google.com/search?q=aniplex&oq=aniplex&aqs=chrome..69i57j35i39l2j0i131i433i512j46i131i433i512j69i60l3.4358j0j9&sourceid=chrome&ie=UTF-8",
  "https://www.google.com/search?q=hulu&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=netflix&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=fullmetalalchemist&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=aria_of_a_starless_night&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=pakistand&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=tonikawa&gl=us&hl=en&pws=0",
  "https://www.google.com/search?q=alchemystars&gl=us&hl=en&pws=0",
];
getRelatedSearches(urls);
