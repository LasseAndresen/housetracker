import {DingeoDto} from "./dingeo.dto";

export interface ListingDto {
  url: string;
  title: string;
  description: string;
  imageurl: string;
  location: string;
  available: boolean;
  dateadded: Date;
  pricedkk: string;
  originalpricedkk?: string;
  dinGeoData?: DingeoDto
}
