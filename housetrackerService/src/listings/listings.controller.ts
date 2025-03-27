import {Controller, Get, Post, Req, Res} from '@nestjs/common';
import {Request, Response} from 'express';
import {ListingsService} from "./listings.service";
import {endpointWrapper} from "../utilities/endpointUtilities";

@Controller('listings')
export class ListingsController {

  constructor(private _listingsService: ListingsService) {}
  @Post('addListing')
  async addListing(@Req() request: Request, @Res() response: Response): Promise<void> {
    await endpointWrapper(async () => {
      const { url, userID } = request.body;
      await this._listingsService.addListing(url, userID);
    }, response);
  }

  @Get('getListings')
  async getListings(@Req() request: Request, @Res() response: Response): Promise<void> {
    await endpointWrapper(async () => {
      const listings = await this._listingsService.getListings();
      response.send(listings);
    }, response);
  }
}
