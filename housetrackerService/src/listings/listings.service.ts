import { Injectable } from '@nestjs/common';
import {DataSource} from "typeorm";

@Injectable()
export class ListingsService {

  constructor(private _dataSource: DataSource) {}
  addListing(url: string, userID: number): void {
    console.log('All good ', url);
  }
}
