import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddListingDialogComponent } from './addListing-dialog/addListing-dialog.component';
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsService} from "./data-access/listingsService";
import {ListingCardComponent} from "./components/listing-card/listing-card.component";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ListingListComponent} from "./components/listing-list/listing-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatDialogModule, ListingCardComponent, NgForOf, MatButton, ListingListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  public title = 'webFrontend';
  public listings: ListingDto[] = [];
  constructor(public dialog: MatDialog,
              private _listingsService: ListingsService) {}

  public async ngOnInit() {
    this.listings = await this._listingsService.getListings();
  }
  public openNewListingDialog(): void {
    this.dialog.open(AddListingDialogComponent);
  }
}
