import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatDialogModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'housetracker';
  constructor(public dialog: MatDialog) {}
  openDialog(): void {
    this.dialog.open(ModalDialogComponent);
  }
}
