import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {ListingsService} from "./listings.service";
import {endpointWrapper} from "../utilities/endpointUtilities";
import {ListingDto} from "@lasseandresen/shared-dtos";

@Controller('listings')
export class ListingsController {

  constructor(private _listingsService: ListingsService) {}
  @Get('srapeListing')
  async scrapeListing(@Req() request: Request, @Res() response: Response): Promise<ListingDto> {
    await endpointWrapper(async () => {
      const url = request.query.url as string;
      console.log('Scraping: ' + url);
      return this._listingsService.scrapeListing(url);
    }, response);
  }

  @Post('addListing')
  async addListing(@Req() request: Request, @Res() response: Response): Promise<void> {
    await endpointWrapper(async () => {
      const { url, userID } = request.body;
      await this._listingsService.addListing(url, userID);
    }, response);
  }

  @Get('getListings')
  async getListings(@Req() request: Request, @Res() response: Response): Promise<ListingDto> {
    await endpointWrapper(async () => {
      return this._listingsService.getListings();
    }, response);
  }
}
