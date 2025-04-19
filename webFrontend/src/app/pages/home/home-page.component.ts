import {Component, OnInit} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ListingDto} from "@lasseandresen/shared-dtos";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ListingListComponent} from "../../components/listing-list/listing-list.component";
import {ListingsService} from "../../data-access/listingsService";
import {AddListingDialogComponent} from "../../dialogs/addListing/addListing-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'home-component',
  imports: [MatDialogModule, MatButton, ListingListComponent, MatProgressSpinner, NgIf],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  standalone: true
})
export class HomePageComponent implements OnInit {
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
