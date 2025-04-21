import {ListingDto} from "@lasseandresen/shared-dtos";
import {scrapeWebsite} from "../scraperUtilities";

export class DingeoScraper {
  private readonly _baseUrl: string = 'https://www.dingeo.dk/adresse/';

  public scrape(listingTitle: string) {
    console.log('Scraping DINGEO from : ' + listingTitle);
    const dingeoUrl = this.getDingeoUrlFromListing(listingTitle);
    console.log('DINGEO URL: ' + dingeoUrl);
    // const result = scrapeWebsite(dingeoUrl, []);
  }

  private getDingeoUrlFromListing(listingTitle: string): string {
    // Extract city and zip code and remove them from the string
    const titleSplit = listingTitle.split(' ');
    const city = titleSplit[titleSplit.length - 1];
    const zipCode = titleSplit[titleSplit.length - 2];
    const titleSliced = titleSplit.slice(0, titleSplit.length - 2);

    const titleParts = titleSliced.join(' ').split(',');

    // Get street part (always first part)
    const streetPart = titleParts[0].trim();

    // Split street name and number with letter
    const streetWords = streetPart.split(' ');
    const streetNumber = streetWords.pop()!; // Get the last element (number with possible letter)
    const streetName = streetWords.join('-').toLowerCase();

    // Handle floor part if it exists
    let floorPart = '';
    if (titleParts.length > 1) {
      // Look for floor information in the second part
      const floor = titleParts[1].trim().toLowerCase();
      floorPart = floor
          .replace('. ', '-')  // Replace ". " with "-"
          .replace('.', '-')   // Replace remaining dots
          .replace(' ', '');   // Remove any spaces
    }

    // Construct the URL parts
    const urlParts = [
        `${zipCode}-${encodeURIComponent(city.toLowerCase())}`,
        `${encodeURIComponent(streetName)}-${streetNumber.toLowerCase()}`
    ];

    // Only add floor part if it exists
    if (floorPart) {
        urlParts.push(floorPart);
    }

    return this._baseUrl + urlParts.join('/') + '/';
  }
}
