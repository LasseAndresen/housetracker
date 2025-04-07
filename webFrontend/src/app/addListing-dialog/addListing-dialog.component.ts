import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ListingsService} from "../data-access/listingsService";
import {ScraperService} from "../data-access/scraperService";
import {ListingDto} from "@lasseandresen/shared-dtos";

@Component({
  selector: 'app-addListing-dialog',
  templateUrl: './addListing-dialog.component.html',
  styleUrl: './addListing-dialog.component.scss',
  imports: [
    MatDialogContent,
    MatFormField,
    FormsModule,
    MatDialogActions,
    NgIf,
    MatButton,
    MatLabel,
    MatInput,
    MatDialogTitle
  ],
  standalone: true
})
export class AddListingDialogComponent {
  public inputUrl: string = '';
  public scraperResult: ListingDto = null;
  public errorMessage: string = '';

  // Injecting HttpClient to make API calls
  constructor(
    public dialogRef: MatDialogRef<AddListingDialogComponent>,
    private _http: HttpClient,
    private _listingsService: ListingsService,
    private _scraperService: ScraperService
  ) {}

  // Close dialog function
  public close(): void {
    this.dialogRef.close();
  }

  public async confirm(): Promise<void> {
    await this._listingsService.addListing(this.inputUrl);
    this.dialogRef.close();
  }

  // Handle input changes and call scraperService API
  public async onInputChange(newValue: string): Promise<void> {
    this.errorMessage = '';
    this.scraperResult = null;
    if (!newValue) { // Clear the result if input is empty
      return;
    }
    if (!this.isValidUrl(newValue.trim())) {
      this.errorMessage = 'Invalid URL';
      return;
    }

    try {
      this.scraperResult = await this._listingsService.scrapeListing(newValue);
    } catch (error) {
      console.error(error);
      this.errorMessage = error.message;
    }

  }

  private isValidUrl(url: string): boolean {
    const regex = /^(http|https):\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/;
    return regex.test(url);
  }
}
