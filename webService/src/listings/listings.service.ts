import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Listing} from "../entity/entities";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsCache} from "./listings.cache";
import {EntityUtilities} from "../utilities/entityUtilities";

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
      const newListing = EntityUtilities.ListingDtoToEntity(listing);
      newListing.dateadded = new Date();
      await newListing.save();
    } else {
      console.log('Listing already exists. Skipping. ', existingListing);
    }

    // Add UserListing link
  }

  public async deleteListing(url: string) {
    // Delete UserListing link
  }

  public async scrapeListing(url: string): Promise<ListingDto> {
    return this._listingsCache.getListing(url);
  }

  public async getListings(): Promise<ListingDto[]> {
    const allListings = await this._dataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .getMany();
    console.log('Found listings ', allListings);
    return allListings.map(l => EntityUtilities.ListingEntityToDto(l));
  }
}
