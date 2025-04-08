import {Listing} from "../entity/entities";
import {ListingDto} from "@lasseandresen/shared-dtos";

export class EntityUtilities {

  public static ListingEntityToDto(listing: Listing): ListingDto {
    return {
      url: listing.url,
      title: listing.title,
      description: listing.description,
      imageurl: listing.imageurl,
      location: listing.location,
      available: listing.available,
      dateadded: listing.dateadded ?? new Date(0), // fallback if null
      pricedkk: listing.pricedkk,
    }
  }

  public static ListingDtoToEntity(listing: ListingDto): Listing {
    const newListing = new Listing();
    newListing.url = listing.url;
    newListing.externalid = 'test';
    newListing.title = listing.title;
    newListing.description = listing.description;
    newListing.imageurl = listing.imageurl;
    newListing.location = listing.location;
    newListing.available = listing.available;
    newListing.dateadded = listing.dateadded;
    newListing.pricedkk = listing.pricedkk;
    return newListing;
  }
}
