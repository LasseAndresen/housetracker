import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";
import {Listing, Useraccountlistingslink} from "../entity/entities";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsCache} from "./listings.cache";
import {EntityUtilities} from "../utilities/entityUtilities";

@Injectable()
export class ListingsService {

  constructor(private _dataSource: DataSource,
              private _listingsCache: ListingsCache) {}
  public async addListing(url: string, userID: number) {
    // Add to listings if missing
    let listingEntity = await this._dataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .where("listing.url = :url", {url})
      .getOne();

    // If the listing exists, there's no need to add it again.
    if (!listingEntity) {
      console.log('Listing did not exist. Adding it.');
      // Add Listing
      const listing = await this._listingsCache.getListing(url);
      const newListing = EntityUtilities.ListingDtoToEntity(listing);
      newListing.dateadded = new Date();
      await newListing.save();
      listingEntity = newListing;
    } else {
      console.log('Listing already exists. Skipping. ', listingEntity);
    }

    // Add UserListing link
    const newLink = new Useraccountlistingslink();
    newLink.useraccountid = userID;
    newLink.listingid = listingEntity.id;
    newLink.originalpricedkk = listingEntity.pricedkk;
    await newLink.save();
  }

  public async deleteListing(url: string, userID: number) {
    // Delete UserListing link
    const listing = await this._dataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .where("listing.url = :url", { url })
      .getOne() as Listing;
    const link = await this._dataSource
      .getRepository(Useraccountlistingslink)
      .createQueryBuilder("links")
      .where("links.useraccountid = :userID", { userID })
      .andWhere("links.listingid = :listingID", { listingID: listing.id })
      .getOne();
    if (link) {
      await link.remove();
    } else {
      throw new Error('No link found for listing ' + url);
    }
  }

  public async scrapeListing(url: string): Promise<ListingDto> {
    return this._listingsCache.getListing(url);
  }

  public async getListings(userID: number): Promise<ListingDto[]> {
    const userListings = await this._dataSource
      .getRepository(Listing)
      .createQueryBuilder("listing")
      .innerJoinAndSelect("listing.useraccountlistingslinks", "links", "links.useraccountid = :userID", { userID })
      .getMany();
    console.log('Found listings ', userListings);
    const listings = userListings.map((listing) => EntityUtilities.ListingEntityToDto(listing, listing.useraccountlistingslinks[0]));
    this.fillCurrentPrices(listings);
    return listings;
  }

  private async fillCurrentPrices(listings: ListingDto[]): Promise<void> {
    for (const listing of listings) {
      listing.pricedkk = (await this._listingsCache.getListing(listing.url)).pricedkk;
    }
  }
}
