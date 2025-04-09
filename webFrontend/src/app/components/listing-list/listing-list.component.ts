import {Component, ViewChild, ElementRef, Input} from '@angular/core';
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
  @ViewChild('carousel') carouselRef!: ElementRef;

  @Input()
  listings: ListingDto[] = [];

  isDown = false;
  startX = 0;
  scrollLeft = 0;

  onMouseDown(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const tag = target.tagName.toLowerCase();
    const isImage = tag === 'img';
    const isCarouselPadding = target.classList.contains('carousel');

    if (!isImage && !isCarouselPadding) {
      return; // Don't initiate drag
    }

    this.isDown = true;
    const carousel = this.carouselRef.nativeElement;
    this.startX = event.pageX - carousel.offsetLeft;
    this.scrollLeft = carousel.scrollLeft;
  }

  onMouseLeave() {
    this.isDown = false;
  }

  onMouseUp() {
    this.isDown = false;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDown) return;
    event.preventDefault();
    const carousel = this.carouselRef.nativeElement;
    const x = event.pageX - carousel.offsetLeft;
    const walk = (x - this.startX) * 1.5; // drag speed
    carousel.scrollLeft = this.scrollLeft - walk;
  }


  scrollLeftBtn() {
    this.carouselRef.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRightBtn() {
    this.carouselRef.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }
}
