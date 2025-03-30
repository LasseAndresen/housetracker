import {environment} from "../../environments/environment";
import {BaseDataAccessService} from "./baseDataAccessService";
import {Injectable} from "@angular/core";
import {ListingDto} from "../../../../packages/shared-dtos/src/listing.dto";

@Injectable({
  providedIn: 'root'
})
export class ListingsService extends BaseDataAccessService {
  protected _baseUrl: string = environment.backendUrl + '/listings/';


  public async addListing(url: string): Promise<any> {
    const params = {
      url: url,
      userID: null
    }

    await this.post(params, 'addListing');
  }

  public async getListings(): Promise<any> {
    const params = {
      userID: null
    }
    const response = await this.get<ListingDto[]>(params, 'getListings');
    return response;
  }
}
