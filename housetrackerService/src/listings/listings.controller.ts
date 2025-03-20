import {Controller, Post, Req} from '@nestjs/common';
import {Request} from 'express';

@Controller('listings')
export class ListingsController {
  @Post('addListing')
  addListing(@Req() request: Request): void {
    const { url, userID } = request.body;
    console.log('All good ', url);
  }
}
