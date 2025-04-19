import {Component, computed, input,  output} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardImage, MatCardTitle} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {CommonModule} from "@angular/common";
import {MatButton, MatMiniFabButton} from "@angular/material/button";
import type {ListingDto} from "@lasseandresen/shared-dtos";
import {AddressExtractorPipe} from "./address-extractor.pipe";
import {FormattingUtilities} from "../../utilities/formattingUtilities";
import {MatTooltip} from "@angular/material/tooltip";

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
    MatMiniFabButton,
    AddressExtractorPipe,
    MatTooltip
  ],
  standalone: true
})
export class ListingCardComponent {
  public showDeleteButton = false;
  public currentPrice = computed(() => this.listing().pricedkk + (this.listing().pricedkk.includes('kr') ? '' : 'kr.'));
  public originalPrice = computed(() => this.listing().originalpricedkk + (this.listing().originalpricedkk.includes('kr') ? '' : 'kr.'));
  public currentPriceNumber = computed(() => FormattingUtilities.priceStringToNumber(this.listing().pricedkk) - 300000);
  public originalPriceNumber = computed(() => FormattingUtilities.priceStringToNumber(this.listing().originalpricedkk));

  // Inputs
  public listing = input.required<ListingDto>();
  public isNewPrice = input<boolean>( false);

  // Outputs
  public deleteClicked = output<ListingDto>();

  constructor() {
  }

  protected getPriceDropPercentage(previous: number, current: number): number {
    console.log('Previous, current ', previous, current);
    return Math.round(((previous - current) / previous) * 100);
  }

  public openListingClicked() {
    window.open(this.listing().url, '_blank');
  }

  public async deleteListing() {
    this.deleteClicked.emit(this.listing());
  }
}
