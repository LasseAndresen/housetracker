// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import {AuthService} from "../../auth/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Login</h2>
      <button (click)="loginWithGoogle()" class="google-btn">
        <img src="assets/google-icon.svg" alt="Google logo">
        Sign in with Google
      </button>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      text-align: center;
      border-radius: 8px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .google-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      padding: 10px;
      background-color: white;
      border: 1px solid #ccc;
      border-radius: 4px;
      cursor: pointer;
      font-size: 16px;
    }
    .google-btn img {
      width: 20px;
      height: 20px;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  loginWithGoogle(): void {
    this.authService.googleLogin();
  }
}
