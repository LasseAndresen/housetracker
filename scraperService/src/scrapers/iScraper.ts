import {ListingDto} from "@lasseandresen/shared-dtos";

export interface IScraper {
  scrapeListing(url: string): Promise<ListingDto>;
  scraperFilter(url: string): Promise<any>;
}
