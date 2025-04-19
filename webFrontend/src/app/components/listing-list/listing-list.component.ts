import {Component, ViewChild, ElementRef, input, output} from '@angular/core';
import type { ListingDto } from '@lasseandresen/shared-dtos';
import {MatIcon} from "@angular/material/icon";
import {ListingCardComponent} from "../listing-card/listing-card.component";
import {NgClass, NgForOf} from "@angular/common";
import {MatIconButton} from "@angular/material/button";

@Component({
  selector: 'listing-list',
  templateUrl: './listing-list.component.html',
  styleUrls: ['./listing-list.component.scss'],
  imports: [
    MatIcon,
    MatIconButton,
    ListingCardComponent,
    NgForOf,
    NgClass
  ],
  standalone: true
})
export class ListingListComponent {
  @ViewChild('carousel')
  private _carouselRef!: ElementRef;

  // Inputs
  public listings = input.required<ListingDto[]>();

  // Outputs
  public deleteClicked = output<ListingDto>();

  protected isDown = false;
  private _startX = 0;
  private _scrollLeft = 0;

  protected onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();
    const isImage = tag === 'img';
    const isCarouselPadding = target.classList.contains('carousel');

    if (!isImage && !isCarouselPadding) {
      return; // Don't initiate drag
    }

    this.isDown = true;
    const carousel = this._carouselRef.nativeElement;
    this._startX = event.pageX - carousel.offsetLeft;
    this._scrollLeft = carousel._scrollLeft;
  }

  protected onMouseLeave() {
    this.isDown = false;
  }

  protected onMouseUp() {
    this.isDown = false;
  }

  protected onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const carousel = this._carouselRef.nativeElement;
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - this._startX) * 1.5; // drag speed
    carousel.scrollLeft = this._scrollLeft - walk;
  }


  protected scrollLeftBtn() {
    this._carouselRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  protected scrollRightBtn() {
    this._carouselRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  protected deleteListing(listing: ListingDto) {
    this.deleteClicked.emit(listing);
  }
}
