import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import type {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsService} from "../../data-access/listingsService";

@Component({
  selector: 'listing-card',
  templateUrl: './listing-card.component.html',
  styleUrls: ['./listing-card.component.scss'],
  imports: [
    CommonModule,
    MatCard,
    MatCardTitle,
    MatCardContent,
    MatCardActions,
    MatIcon,
    MatButton,
    MatCardImage,
    MatMiniFabButton
  ],
  standalone: true
})
export class ListingCardComponent {
  public showDeleteButton = false;

  @Input()
  public listing: ListingDto;
  @Input()
  public isNewPrice = false;

  constructor(private _listingService: ListingsService) {
  }

  public openListingClicked() {
    window.open(this.listing.url, '_blank');
  }

  public async deleteListing() {
    await this._listingService.deleteListing(this.listing.url);
  }
}
