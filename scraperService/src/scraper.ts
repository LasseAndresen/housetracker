import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';

export async function scrapeWebsite(url, selectors, verbose = false) {
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
      if (selector.startsWith('_img_')) {
        type = 'image';
        selector = selector.substring(5);
      } else if (selector.startsWith('_first_')) {
        type = 'firstInList';
        selector = selector.substring(7);
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
        const img = $(selector).find('img').attr('src');
        text = img;
      } else if (type === 'firstInList') {
        const elements = $(selector);
        if (elements.length > 0) {
          text = elements.first().text();
        } else {
          text = text.text();
        }
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
