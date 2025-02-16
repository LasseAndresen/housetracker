/**
 * scraper.js
 * To run this script, copy and paste `node scraper.js` in the terminal
 */

const cheerio = require('cheerio'); // For light weight scraping
const puppeteer = require('puppeteer'); // For more advanced scraping

// scrape_cheerio();
myScraper('h1[data-type="product"]', 'span.site-currency-attention');

async function scrape_cheerio() {
  const url = 'https://www.example.com';
  const response = await fetch(url);

  const $ = cheerio.load(await response.text());
  var header = $('h1').text();
  var text = $('p').text();
  var link = $('a').attr('href');
  console.log(header);
  console.log(text);
  console.log(link);
};

async function scrape_puppeteerAndCheerio() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.goto('https://quotes.toscrape.com/');
  
  await browser.close();

  const pageData = await page.evaluate(() => {
    return {
      html: document.documentElement.innerHTML,
    };
  });
  console.log('Page data ', pageData);
  	
  const $ = cheerio.load(pageData.html);
}

async function myScraper(productSelector, priceSelector) {
  const result = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto('https://www.proshop.dk/Mus/Logitech-G903-LIGHTSPEED-HERO-Wireless-Gaming-Mus-Optisk-11-knapper-Sort-med-RGB-lys/2778872');
  
  try {
    await page.waitForSelector('span.site-currency-wrapper', {timeout: 5000});
    await page.waitForSelector(productSelector, {timeout: 5000});
    // await new Promise((resolve, reject) => { setTimeout(resolve, 5000)});
  } catch (e) {
    console.error('Price element not found after 5 seconds');
    browser.close();
    return;
  }
  
  const pageData = await page.evaluate(() => {
    return {
      html: document.documentElement.innerHTML,
    };
  });
  // console.log('Page data ', pageData);
  	
  const $ = cheerio.load(pageData.html);
  // var spans = $('span.site-currency-wrapper');
  var wrapper = $('span.site-currency-wrapper');
  var productName = $(productSelector).text();
  var productPrice = $(wrapper).find(priceSelector).text();
  console.log('Product price: ', productPrice);
  result.push({
    name: productName,
    price: productPrice
  });

  console.log('Found item ', result[0]);
  browser.close();
}


class scrapedItem {
  name;
  price;
}