import { Component } from '@angular/core';
import {MatDialogActions, MatDialogContent, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";

@Component({
  selector: 'app-modal-dialog',
  imports: [MatButtonModule,
    MatInputModule,
    MatFormFieldModule, MatDialogContent, MatDialogActions],
  templateUrl: './modal-dialog.component.html',
  styleUrl: './modal-dialog.component.scss',
  standalone: true
})
export class ModalDialogComponent {
  constructor(public dialogRef: MatDialogRef<ModalDialogComponent>) {}
  close(): void {
    this.dialogRef.close();
  }
}
