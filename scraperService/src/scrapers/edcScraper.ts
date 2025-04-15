import {IScraper} from "./iScraper";
import {scrapeWebsite} from "../scraperUtilities";
import {Selector} from "../models/selector";
import {ListingDto} from "@lasseandresen/shared-dtos";
import Root = cheerio.Root;

export class EdcScraper implements IScraper {
  public async scrapeListing(url: string): Promise<ListingDto> {
    const selectors = [
      {type: 'string', selector: 'div[data-module=Case] div:nth-child(2) header h1'} as Selector, // Title 1
      {type: 'string', selector: 'div[data-module=Case] span:nth-child(2)'} as Selector, // Title 2
      {type: 'custom', selector: 'aside dt', customSelector: ($: Root) => this.customMetadataSelector($, 'Pris')} as Selector, // Price
      {type: 'custom', selector: 'aside dt', customSelector: ($: Root) => this.customMetadataSelector($, 'Boligareal')} as Selector, // Area
      {type: 'custom', selector: 'aside dt', customSelector: ($: Root) => this.customMetadataSelector($, 'Rum/værelser')} as Selector, // Room count
      {type: 'image', selector: '.glide__slide--active picture'} as Selector, // Image
    ];

    const scrapeResult = scrapeWebsite(url, selectors, true);

    // TODO: format result
    return new Promise<ListingDto>((resolve, reject) => {
      scrapeResult.then((result) => {
        const title = result[0].split(',')[0].trim() + ' ' + result[1];
        const price = result[2];
        const area = result[3];
        const roomCount = result[4].split('/')[0];
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

  private customMetadataSelector($: Root, metadata: string): string | null {
    try {
      // Find all dt elements and locate the one containing the desired metadata (exact match)
      const priceElement = $('aside dt')
        .filter(function() {
          return $(this).text().trim() === metadata;
        });

      // If found, get the corresponding dd element's text content
      if (priceElement.length > 0) {
        // Get the parent div of the dt element
        const parentDiv = priceElement.parent();

        // Find the dd element within the parent div
        const ddElement = parentDiv.find('dd .font-bold');

        // Return the text content of the span with font-bold class
        return ddElement.text().trim() || null;
      }

      return null;
    } catch (error) {
      console.error('Error extracting metadata: ', metadata, error);
      return null;
    }
  }

  public scraperFilter(url: string): Promise<any> {
    throw new Error("Method not implemented.");
  }

}
