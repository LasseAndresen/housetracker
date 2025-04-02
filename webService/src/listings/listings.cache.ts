import {Injectable} from "@nestjs/common";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ConfigService} from "@nestjs/config";
import {ScraperService} from "../data-access/scraperService";

@Injectable()
export class ListingsCache {
  private _listingsByUrl: Record<string, { listing: ListingDto, timestamp: number }> = {};

  constructor(private _configService: ConfigService,
              private _scraperService: ScraperService) {
  }
  public async getListing(url: string): Promise<ListingDto> {
    // Invalidate cache if it's older than 10 minutes
    if (!!this._listingsByUrl[url] && this._listingsByUrl[url].timestamp < Date.now() - 1000 * 60 * 10) {
      delete this._listingsByUrl[url];
    }

    // Add to listings if missing
    if (!this._listingsByUrl[url]) {
      const scrapeResult: ListingDto = await this._scraperService.fetchProductDetails(url, []);
      this._listingsByUrl[url] = {
        listing: scrapeResult,
        timestamp: Date.now()
      }
    }

    return this._listingsByUrl[url].listing;
  }
}
