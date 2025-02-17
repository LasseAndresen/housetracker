/**
 * scraper.js
 * To run this script, copy and paste `node scraper.js` in the terminal
 */

const url = 'https://www.proshop.dk/Mus/Logitech-G903-LIGHTSPEED-HERO-Wireless-Gaming-Mus-Optisk-11-knapper-Sort-med-RGB-lys/2778872';
const productSelector = 'h1[data-type="product"]';
const priceSelector = 'span.site-currency-wrapper > span.site-currency-attention';
scrape(url, [productSelector, priceSelector])
  .then(result => console.log('Result ', result));


async function scrape(url, selectors, verbose = false) {
  const cheerio = require('cheerio'); // For light weight scraping
  const puppeteer = require('puppeteer'); // For more advanced scraping

  const result = [];
  const browser = await puppeteer.launch();
  try {
    const page = await browser.newPage();

    await page.goto(url);
  
    const pageData = await page.evaluate(() => {
      return {
        html: document.documentElement.innerHTML,
      };
    });
    if (verbose) {
      console.log('Page data ', pageData);
    }
    
    for (const selector of selectors) {
      try {
        await page.waitForSelector(selector, {timeout: 5000});
      } catch (e) {
        console.error('Selector not found after 5 seconds ', selector);
        result.push(null);
        continue;
      }
      
      const $ = cheerio.load(pageData.html);
      var text = $(selector).text();
      result.push(text);
    }

    if (verbose) {
      console.log('Scraped from URL: ' + url + '\n', result);
    }
    return result;
  } finally {
    browser.close();
  }
}