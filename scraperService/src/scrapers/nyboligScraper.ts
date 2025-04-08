import {IScraper} from "./iScraper";
import {scrapeWebsite} from "../scraperUtilities";
import {Selector} from "../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class NyboligScraper implements IScraper {
  public scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'string', selector: '[data-property-group]'} as Selector,
      {type: 'string', selector: 'div.case-facts__box-title__price'} as Selector,
      {type: 'image', selector: '.media-presentation__minified__left'} as Selector,
      {type: 'firstInList', selector: '.case-facts__box-inner-wrap'} as Selector
    ];

    const scrapeResult = scrapeWebsite(url, selectors);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const listing = {
          title: result[0].trim(),
          pricedkk: parseInt(result[1]),
          imageurl: result[2],
          description: result[3]?.trim() ?? '',
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
