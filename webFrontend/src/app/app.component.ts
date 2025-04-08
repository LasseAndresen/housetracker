import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddListingDialogComponent } from './addListing-dialog/addListing-dialog.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";
import {provideHttpClient, withFetch} from "@angular/common/http";
import {ListingDto} from "@lasseandresen/shared-dtos";
import {ListingsService} from "./data-access/listingsService";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatDialogModule, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent implements OnInit {
  public title = 'webFrontend';
  public listings: ListingDto[] = null;
  constructor(public dialog: MatDialog,
              private _listingsService: ListingsService) {}

  public async ngOnInit() {
    this.listings = await this._listingsService.getListings();
  }
  public openNewListingDialog(): void {
    this.dialog.open(AddListingDialogComponent);
  }
}
