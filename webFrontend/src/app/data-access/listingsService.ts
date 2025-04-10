import {environment} from "../../environments/environment";
import {BaseDataAccessService} from "./baseDataAccessService";
import {Injectable} from "@angular/core";
import {ListingDto} from "@lasseandresen/shared-dtos";

@Injectable({
  providedIn: 'root'
})
export class ListingsService extends BaseDataAccessService {
  protected _baseUrl: string = environment.backendUrl + '/listings/';


  public async scrapeListing(url: string): Promise<ListingDto> {
    const params = {
      url: url,
    }
    return this.get<ListingDto>(params, 'srapeListing');
  }
  public async addListing(url: string): Promise<void> {
    const params = {
      url: url,
      userID: null
    }

    await this.post(params, 'addListing');
  }

  public async deleteListing(url: string): Promise<void> {
    const params = {
      url: url
    }
    await this.post(params, 'deleteListing');
  }

  public async getListings(): Promise<ListingDto[]> {
    const params = {
      userID: null
    }
    return this.get<ListingDto[]>(params, 'getListings');
  }
}
