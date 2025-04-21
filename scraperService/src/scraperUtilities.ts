import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import {Selector} from "./models/selector";
import {IRealEstateScraper} from "./scrapers/realEstate/iRealEstateScraper";
import {NyboligScraper} from "./scrapers/realEstate/nyboligScraper";
import {DanboligScraper} from "./scrapers/realEstate/danboligScraper";
import {HomeScraper} from "./scrapers/realEstate/homeScraper";
import {EdcScraper} from "./scrapers/realEstate/edcScraper";
import {BoligsidenScraper} from "./scrapers/realEstate/boligsidenScraper";

export function getScraperFromUrl(url: string): IRealEstateScraper {
  if (url.includes('nybolig.dk')) {
    return new NyboligScraper();
  }
  if (url.includes('danbolig.dk')) {
    return new DanboligScraper();
  }
  if (url.includes('home.dk')) {
    return new HomeScraper();
  }
  if (url.includes('edc.dk')) {
    throw new Error('EDC unfortunately cannot be scraped. Please use another website.');
    return new EdcScraper();
  }
  if (url.includes('boligsiden.dk')) {
    return new BoligsidenScraper();
  }

  return null;
}

export async function scrapeWebsite(url, selectors: Selector[], verbose = false): Promise<string[]> {
  const result: string[] = [];
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
      try {
        await page.waitForSelector(selector.selector, {timeout: 5000});
      } catch (e) {
        console.log('Selector not found after 5 seconds ', selector);
        result.push(null);
        continue;
      }
      
      let text: string;
      if (selector.type === 'image') {
        const img = $(selector.selector).find('img').attr('src');
        text = img;
      } else if (selector.type === 'stringFirst') {
        const elements = $(selector.selector);
        if (elements.length > 0) {
          text = elements.first().text();
        } else {
          text = elements.text();
        }
      } else if (selector.type === 'custom') {
        text = selector.customSelector($);
      }
      else {
        text = $(selector.selector).text();
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

export function getSelectorsFromStrings(selectors: string[]): Selector[] {
  const result = [];
  for (let selector of selectors) {
    if (selector.includes('_img_')) {
      result.push({type: 'image', selector: selector.substring(5)});
    } else if (selector.includes('_first_div')) {
      result.push({type: 'stringFirst', selector: selector.substring(7)});
    } else {
      result.push({type: 'string', selector: selector});
    }
  }
  return result;
}
