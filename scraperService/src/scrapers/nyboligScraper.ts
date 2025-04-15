import {IScraper} from "./iScraper";
import {scrapeWebsite} from "../scraperUtilities";
import {Selector} from "../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class NyboligScraper implements IScraper {
  public async scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'string', selector: '[data-property-group]'} as Selector, // Title
      {type: 'string', selector: 'div.case-facts__box-title__price'} as Selector, // Price
      {type: 'image', selector: '.media-presentation__minified__left'} as Selector, // Image
      {type: 'firstInList', selector: '.case-facts__box-inner-wrap'} as Selector // Description
    ];

    const scrapeResult = scrapeWebsite(url, selectors);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const title = result[0].trim();
        const price = result[1].split(' ')[0];
        const description = result[3]?.trim() ?? '';
        const imageUrl = result[2];
        const listing = {
          title: title,
          pricedkk: price,
          imageurl: imageUrl,
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
