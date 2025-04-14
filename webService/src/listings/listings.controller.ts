import {Controller, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import {Request, Response} from 'express';
import {ListingsService} from "./listings.service";
import {endpointWrapper} from "../utilities/endpointUtilities";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {AuthGuard} from "@nestjs/passport";
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {Useraccount} from "../entity/entities";

@Controller('listings')
export class ListingsController {

  constructor(private _listingsService: ListingsService) {}
  @Get('srapeListing')
  @UseGuards(JwtAuthGuard)
  async scrapeListing(@Req() request: Request, @Res() response: Response): Promise<ListingDto> {
    await endpointWrapper(async () => {
      const url = request.query.url as string;
      console.log('Scraping: ' + url);
      return this._listingsService.scrapeListing(url);
    }, response);
  }

  @Post('addListing')
  @UseGuards(JwtAuthGuard)
  async addListing(@Req() request: Request, @Res() response: Response): Promise<void> {
    await endpointWrapper(async () => {
      const { url } = request.body;
      const user = request.user as Useraccount;
      await this._listingsService.addListing(url, user.id);
    }, response);
  }

  @Post('deleteListing')
  @UseGuards(JwtAuthGuard)
  async deleteListing(@Req() request: Request, @Res() response: Response): Promise<void> {
    await endpointWrapper(async () => {
      const { url } = request.body;
      const user = request.user as Useraccount;
      await this._listingsService.deleteListing(url, user.id);
    }, response);
  }

  @Get('getListings')
  @UseGuards(JwtAuthGuard)
  async getListings(@Req() request: Request, @Res() response: Response): Promise<ListingDto> {
    await endpointWrapper(async () => {
      const user = request.user as Useraccount;

      console.log('User data from JWT:', user);
      return this._listingsService.getListings(user.id);
    }, response);
  }
}
