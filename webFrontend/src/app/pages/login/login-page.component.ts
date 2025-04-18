// src/app/components/login/login-page.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AuthService} from "../../auth/auth.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {InitializationService} from "../../auth/initialization.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, MatProgressSpinner],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  rememberMe = false;

  constructor(private authService: AuthService,
              public initializationService: InitializationService) {}

  loginWithGoogle(): void {
    this.authService.googleLogin(this.rememberMe);
  }
}
