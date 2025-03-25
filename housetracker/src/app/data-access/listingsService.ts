import {environment} from "../../environments/environment";
import {BaseDataAccessService} from "./baseDataAccessService";
import {Injectable} from "@angular/core";

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

    await this.makePostRequest(params, 'addListing');
  }
}
