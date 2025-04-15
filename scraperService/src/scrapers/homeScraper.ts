import {IScraper} from "./iScraper";
import {scrapeWebsite} from "../scraperUtilities";
import {Selector} from "../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class HomeScraper implements IScraper {
  public async scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'string', selector: 'div.property-details-main__content-inner .property-details-information__row h1'} as Selector, // Title
      {type: 'string', selector: '.property-details-main__content-inner .property-details-information__facts p:nth-child(2)'} as Selector, // Price
      {type: 'string', selector: '.property-details-main__content-inner .property-details-information__facts p:nth-child(1)'} as Selector, // Area
      {type: 'string', selector: '.usps__items div:nth-child(1) span:nth-child(1)'} as Selector, // Room count
      {type: 'image', selector: 'div.property-details-main__header div:nth-child(1)'} as Selector, // Image
    ];

    const scrapeResult = scrapeWebsite(url, selectors);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const title = result[0].replace(',', '').trim();
        const price = result[1].split('Kontant ')[1];
        const area = result[2].split(' ')[0] + 'm²';
        const description = area + ' - ' + result[3] + ' rum';
        const imageurl = result[4];
        const listing = {
          title: title,
          pricedkk: price,
          imageurl: imageurl,
          description: description,
          url: url,
          dateadded: new Date(),
          location: 'Copenhagen',
          available: true,
        } as ListingDto;
        resolve(listing);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public scraperFilter(url: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
}
