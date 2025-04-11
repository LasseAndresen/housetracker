import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {ListingDto} from "@lasseandresen/shared-dtos";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {ListingListComponent} from "../listing-list/listing-list.component";
import {ListingCardComponent} from "../listing-card/listing-card.component";
import {ListingsService} from "../../data-access/listingsService";
import {AddListingDialogComponent} from "../../addListing-dialog/addListing-dialog.component";

@Component({
  selector: 'home-component',
  imports: [RouterOutlet,
    MatDialogModule, ListingCardComponent, NgForOf, MatButton, ListingListComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
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
