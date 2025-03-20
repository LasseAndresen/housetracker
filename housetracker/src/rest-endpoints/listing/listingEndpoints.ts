import { endpointWrapper } from "../endpointUtilities";
import { ListingHelper } from "./listingHelper";


export class ListingEndpoints {
  public static initialize(app: any) {
    app.post('/api/addListing', async (req: any, res: any) => {
      const { url, userID } = req.body;
      endpointWrapper(() => ListingHelper.addListing(url, userID), res);
    });
  }
}
