import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'listing-card-skeleton',
  templateUrl: './listing-card-skeleton.component.html',
  styleUrls: ['./listing-card-skeleton.component.scss'],
  standalone: true,
  imports: [MatCardModule],
})
export class ListingCardSkeletonComponent {}
