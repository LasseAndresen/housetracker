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
  inputUrl: string = '';
  scraperResult: any = null;

  // Injecting HttpClient to make API calls
  constructor(
    public dialogRef: MatDialogRef<AddListingDialogComponent>,
    private http: HttpClient
  ) {}

  // Close dialog function
  close(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const apiUrl = 'http://localhost:3000/listings/addListing';
    const params = {
      url: this.inputUrl,
      userID: null
    }

    this.http.post(apiUrl, params, { headers }).subscribe(
      (response) => {
        console.log('Response ', response);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
    this.dialogRef.close();
  }

  // Handle input changes and call scraper API
  onInputChange(): void {
    if (this.inputUrl && this.inputUrl.trim()) {
      this.fetchProductDetails(this.inputUrl).subscribe(
        (response) => {
          // Assuming response contains name, price, image URL, and additional info
          console.log('Response ', response);
          this.scraperResult = {
            name: response[0],
            price: response[1],
            image: response[2],  // Assuming the image URL is returned as 'imageUrl'
            additionalInfo: response[3],
          };
        },
        (error) => {
          console.error('Error fetching data:', error);
          this.scraperResult = null; // Reset result on error
        }
      );
    } else {
      this.scraperResult = null; // Clear the result if input is empty
    }
  }

  // Function to call the scraper API
  fetchProductDetails(url: string): Observable<any> {
    const apiUrl = 'http://localhost:3002/scrape';
    const params = {
      url: url,
      selectors: ['[data-property-group]',
        'div.case-facts__box-title__price',
        '_img_.media-presentation__minified__left',
        '_first_div.case-facts__box-inner-wrap'] // Example selectors
    };

    try {
      return this.http.get<any>(apiUrl, { params });
    } catch (error) {
      console.error('Error fetching scraper data', error);
      throw error;
    }
  }
}
