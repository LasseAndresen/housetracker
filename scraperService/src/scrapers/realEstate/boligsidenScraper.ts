import {IRealEstateScraper} from "./iRealEstateScraper";
import {scrapeWebsite} from "../../scraperUtilities";
import {Selector} from "../../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class BoligsidenScraper implements IRealEstateScraper {
  public async scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'stringFirst', selector: '[id=oversigt] .text-lg'} as Selector, // Title 1
      {type: 'string', selector: '[id=oversigt] .block'} as Selector, // Title 2
      {type: 'stringFirst', selector: '[id=oversigt] h2'} as Selector, // Price
      {type: 'string', selector: '[aria-describedby=tippy-tooltip-4]'} as Selector, // Area
      {type: 'stringFirst', selector: '[id=oversigt] .leading-normal:nth-child(2)'} as Selector, // Room count
      {type: 'image', selector: '.object-cover'} as Selector, // Image
    ];

    const scrapeResult = scrapeWebsite(url, selectors, true);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const title = result[0] + ' ' + result[1];
        const price = result[2];
        const area = result[3];
        const roomCount = result[4].split(' ')[0];
        const description = area + ' - ' + roomCount + ' rum';
        const imageurl = result[5];
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
