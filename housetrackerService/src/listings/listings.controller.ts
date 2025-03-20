import {Controller, Post, Req} from '@nestjs/common';
import {Request} from 'express';
import {ListingsService} from "./listings.service";

@Controller('listings')
export class ListingsController {

  constructor(private _listingsService: ListingsService) {}
  @Post('addListing')
  addListing(@Req() request: Request): void {
    const { url, userID } = request.body;
    this._listingsService.addListing(url, userID);
  }
}
