import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';
import {MatCard, MatCardActions, MatCardContent, MatCardHeader, MatCardTitle, MatCardSubtitle} from "@angular/material/card";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatDialogModule, MatCard, MatCardHeader, MatCardContent, MatCardActions, MatCardTitle, MatCardSubtitle, MatButton],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'housetracker';
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    this.dialog.open(ModalDialogComponent);
  }
}
