/**
 * scraper.js
 * To run this script, copy and paste `node scraper.js` in the terminal
 */

const url = 'https://www.proshop.dk/Mus/Logitech-G903-LIGHTSPEED-HERO-Wireless-Gaming-Mus-Optisk-11-knapper-Sort-med-RGB-lys/2778872';
const productSelector = 'h1[data-type="product"]';
const priceSelector = 'span.site-currency-wrapper > span.site-currency-attention';
scrapeWebsite(url, [productSelector, priceSelector])
  .then(result => console.log('Result ', result));


async function scrapeWebsite(url, selectors, verbose = false) {
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
    const $ = cheerio.load(pageData.html);
    if (verbose) {
      console.log('Page data ', pageData);
    }
    
    for (let selector of selectors) {
      let type = 'string';
      if (selector.startsWith('!img!')) {
        type = 'image';
        selector = selector.substring(5);
      }
      try {
        await page.waitForSelector(selector, {timeout: 5000});
      } catch (e) {
        console.log('Selector not found after 5 seconds ', selector);
        result.push(null);
        continue;
      }
      
      let text;
      if (type === 'image') {
        const img = $(selector).attr('src');
        result.push(img);
      } else {
        text = $(selector).text();
      }
      
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

module.exports = scrapeWebsite;