import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ListingDto} from "@lasseandresen/shared-dtos";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ListingListComponent} from "../listing-list/listing-list.component";
import {ListingCardComponent} from "../listing-card/listing-card.component";
import {ListingsService} from "../../data-access/listingsService";
import {AddListingDialogComponent} from "../../addListing-dialog/addListing-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'home-component',
  imports: [RouterOutlet,
    MatDialogModule, ListingCardComponent, NgForOf, MatButton, ListingListComponent, MatProgressSpinner, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  public listings: ListingDto[] = [];
  public loadingListings = false;
  constructor(public dialog: MatDialog,
              private _listingsService: ListingsService) {}

  public ngOnInit() {
    this.loadListings();
  }

  private async loadListings() {
    try {
      this.loadingListings = true;
      this.listings = await this._listingsService.getListings();
    } finally {
      this.loadingListings = false;
    }
  }
  public openNewListingDialog(): void {
    const dialogRef = this.dialog.open(AddListingDialogComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadListings();
      }
    })
  }

  public async deleteListing(listing: ListingDto) {
    await this._listingsService.deleteListing(listing.url);
    await this.loadListings();
  }
}
