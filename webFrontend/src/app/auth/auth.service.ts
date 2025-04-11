// src/app/services/auth.service.ts
import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // Only check localStorage on browser
    if (isPlatformBrowser(this.platformId)) {
      this.loadToken();
    }
  }

  private loadToken(): void {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      this.validateAndLoadUser(token);
    }
  }

  // Initiate Google OAuth login by redirecting to the backend endpoint
  googleLogin(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.location.href = `${this.apiUrl}/google`;
    }
  }

  // Handle the callback from OAuth provider
  handleAuthCallback(token: string): void {
    if (isPlatformBrowser(this.platformId) && !!token) {
      localStorage.setItem(this.tokenKey, token);
      this.validateAndLoadUser(token);
    }
  }

  // Get user profile information from backend
  private validateAndLoadUser(token: string): void {
    this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(user => {
        console.log('Setting user profile', user);
        this.currentUserSubject.next(user);
        console.log('Navigating to home page');
        this.router.navigate(['']); // Redirect to home page after successful login
      }),
      catchError(error => {
        console.error('Error loading user profile:', error);
        this.logout();
        return of(null);
      })
    ).subscribe();
  }

  // Get the current authenticated user
  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!this.currentUserSubject.value;
  }

  // Get the JWT token
  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  // Logout user
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }
}
