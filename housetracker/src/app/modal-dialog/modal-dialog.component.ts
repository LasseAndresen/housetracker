import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle} from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
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
export class ModalDialogComponent {
  inputUrl: string = '';
  scraperResult: any = null;

  // Injecting HttpClient to make API calls
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    private http: HttpClient
  ) {}

  // Close dialog function
  close(): void {
    this.dialogRef.close();
  }

  // Handle input changes and call scraper API
  onInputChange(): void {
    if (this.inputUrl && this.inputUrl.trim()) {
      this.fetchProductDetails(this.inputUrl).subscribe(
        (response) => {
          // Assuming response contains name, price, image URL, and additional info
          this.scraperResult = {
            name: response.name,
            price: response.price,
            image: response.imageUrl,  // Assuming the image URL is returned as 'imageUrl'
            additionalInfo: response.additionalInfo,
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
    const apiUrl = 'http://localhost:3000/scrape';  // Your scraper API endpoint
    const params = {
      url: url,
      selectors: ['h1.media-presentation__case-info__property__info__title"',
        'div.case-facts__box-title__price',
        '!img!.media-presentation__minified__left',
        'div.case-facts__box-inner-wrap'] // Example selectors
    };

    try {
      return this.http.get<any>(apiUrl, { params });
    } catch (error) {
      console.error('Error fetching scraper data', error);
      throw error;
    }
  }
}
