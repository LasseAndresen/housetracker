// src/app/components/auth-callback/auth-callback.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule],
  template: '<div>Processing authentication, please wait...</div>'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];

      console.log('Received Token: ' + token);
      if (token) {
        this.authService.handleAuthCallback(token);
      } else {
        // No token found, redirect to login
        this.router.navigate(['/login']);
      }
    });
  }
}
