import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Listing} from "../entity/entities";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsCache} from "./listings.cache";

@Injectable()
export class ListingsService {

  constructor(private _dataSource: DataSource,
              private _listingsCache: ListingsCache) {}
  public async addListing(url: string, userID: number) {
    // Add to listings if missing
    const existingListing = await this._dataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .where("listing.url = :url", {url})
      .getOne();

    // If the listing exists, there's no need to add it again.
    if (!existingListing) {
      console.log('Listing did not exist. Adding it.');
      // Add Listing
      const listing = await this._listingsCache.getListing(url);
      const newListing = new Listing();
      newListing.url = url;
      newListing.externalid = 'test';
      newListing.title = listing.title;
      newListing.description = listing.description;
      newListing.pricedkk = listing.pricedkk;
      newListing.imageurl = listing.imageurl;
      newListing.location = listing.location;
      newListing.available = listing.available;
      newListing.dateadded = new Date();
      await newListing.save();
    } else {
      console.log('Listing already exists. Skipping. ', existingListing);
    }

    // Add UserListing link
  }

  public async scrapeListing(url: string): Promise<ListingDto> {
    return this._listingsCache.getListing(url);
  }

  public async getListings(): Promise<ListingDto[]> {
    return [];
  }
}
