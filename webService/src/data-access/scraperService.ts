
import {BaseDataAccessService} from "./baseDataAccessService";
import {Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ConfigService} from "@nestjs/config";

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
}
