import {IRealEstateScraper} from "./iRealEstateScraper";
import {scrapeWebsite} from "../../scraperUtilities";
import {Selector} from "../../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class DanboligScraper implements IRealEstateScraper {
  public async scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'string', selector: '.o-propertyFacts__address'} as Selector, // Title
      {type: 'string', selector: 'ul.o-propertyFacts__facts li:nth-child(1) span:nth-child(1)'} as Selector, // Price
      {type: 'string', selector: 'ul.o-propertyFacts__facts li:nth-child(1) span:nth-child(2)'} as Selector, // Area
      {type: 'string', selector: 'ul.o-propertyFacts__facts li:nth-child(1) span:nth-child(3)'} as Selector, // Rooms
      {type: 'image', selector: 'div.o-propertyHeroImageGrid div:nth-child(1)'} as Selector, // Image
    ];

    const scrapeResult = scrapeWebsite(url, selectors);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const title = result[0].trim();
        const price = result[1];
        const description = result[2] + ' - ' + result[3];
        const imageUrl = result[4];
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
