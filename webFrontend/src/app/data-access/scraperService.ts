import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {BaseDataAccessService} from "./baseDataAccessService";

@Injectable({
  providedIn: 'root'
})
export class ScraperService extends BaseDataAccessService {
  protected _baseUrl: string = environment.scraperAPIUrl;

  public async fetchProductDetails_deprecated(url: string, selectors: string[]): Promise<any> {
    const params = {
      url: url,
      selectors: selectors
    }

    return await this.get(params, '/scrapeTest');
  }
}
