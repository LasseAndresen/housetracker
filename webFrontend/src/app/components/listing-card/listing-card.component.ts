import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButton} from "@angular/material/button";
import type {ListingDto} from "@lasseandresen/shared-dtos";

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
    MatCardImage
  ],
  standalone: true
})
export class ListingCardComponent {
  @Input()
  listing: ListingDto;
  @Input()
  isNewPrice = false;

  public openListingClicked() {
    window.open(this.listing.url, '_blank');
  }
}
