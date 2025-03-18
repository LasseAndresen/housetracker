import { AppDataSource } from "../../../data-source";
import { Listing } from "../../entity/entities/Listing";

export class ListingHelper {
  public static async addListing(url: string, userID: number) {
    // Add to listings if missing
    const existingListing = await AppDataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .where("listing.url = :url", {url})
      .getOne();

      // If the listing exists, there's no need to add it again.
      if (!existingListing) {
        // Add Listing
        const newListing = new Listing();
        newListing.url = url;
        await newListing.save();
      }

      // Add UserListing link
  }
}
