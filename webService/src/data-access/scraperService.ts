
import {BaseDataAccessService} from "./baseDataAccessService";
import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";
import {ListingDto} from "@lasseandresen/shared-dtos";

@Injectable({
})
export class ScraperService extends BaseDataAccessService {
  protected _baseUrl: string = this._configService.get<string>('SCRAPER_SERVICE_URL') ?? '';

  constructor(private readonly _httpService: HttpService,
              private readonly _configService: ConfigService) {
    super(_httpService);
  }
  public async fetchProductDetails(url: string, selectors: string[]): Promise<any> {
    const params = {
      url: url,
      selectors: selectors
    }

    return await this.get(params, '/scrape');
  }

  public async scrapeListing(url: string): Promise<ListingDto> {
    const params = {
      url: url
    }

    return this.get<ListingDto>(params, '/scrapeListing');
  }
}
