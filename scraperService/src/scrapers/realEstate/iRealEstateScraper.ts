import {ListingDto} from "@lasseandresen/shared-dtos";

export interface IRealEstateScraper {
  scrapeListing(url: string): Promise<ListingDto>;
  scraperFilter(url: string): Promise<any>;
}
