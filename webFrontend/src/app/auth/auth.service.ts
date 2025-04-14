// src/app/services/auth.service.ts
import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, firstValueFrom, map, Observable, of} from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private currentUserSubject = new BehaviorSubject<any>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenKey = 'auth_token';
  private rememberMeKey = 'remember_me';

  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Initiate Google OAuth login with optional remember me param
  googleLogin(rememberMe: boolean = false): void {
    if (isPlatformBrowser(this.platformId)) {
      // Store the remember me preference
      localStorage.setItem(this.rememberMeKey, rememberMe.toString());

      // You can pass rememberMe as a query param to handle it server-side too
      window.location.href = `${this.apiUrl}/google?rememberMe=${rememberMe}`;
    }
  }

  // Handle the callback from OAuth provider
  handleAuthCallback(token: string): void {
    if (isPlatformBrowser(this.platformId) && token) {
      const rememberMe = localStorage.getItem(this.rememberMeKey) === 'true';

      // Store token in the appropriate storage based on remember me choice
      if (rememberMe) {
        console.log('Setting token in localStorage ', token);
        localStorage.setItem(this.tokenKey, token);
      } else {
        console.log('Setting token in sessionStorage ', token);
        sessionStorage.setItem(this.tokenKey, token);
        // Clear from localStorage if it exists there to prevent conflicts
        localStorage.removeItem(this.tokenKey);
      }

      this.validateAndLoadUser(token);
    }
  }

  async initializeFromStorage(): Promise<boolean> {
    if (!isPlatformBrowser(this.platformId)) {
      return false// of(false);
    }

    const rememberMe = localStorage.getItem(this.rememberMeKey) === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    const token = storage.getItem(this.tokenKey);
    console.log('Remember me: ', rememberMe);
    console.log('Found token ', token);

    if (!token) {
      return false// of(false);
    }

    // Return an observable that completes when user profile is loaded
    try{
      const user = await firstValueFrom(this.http.get<any>(`${this.apiUrl}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      }));
      this.currentUserSubject.next(user);
      return true;
    } catch (e) {
      console.error('Invalid token, clearing from storage ', e);
      storage.removeItem(this.tokenKey);
      return false;
    }
  }

  // Get user profile information from backend
  private validateAndLoadUser(token: string): void {
    console.trace('Getting user profile');
    this.http.get<any>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(user => {
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

  // Get the JWT token from appropriate storage
  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) return null;

    const rememberMe = localStorage.getItem(this.rememberMeKey) === 'true';
    const storage = rememberMe ? localStorage : sessionStorage;
    return storage.getItem(this.tokenKey);
  }

  // Logout user
  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      console.log('Logging out');
      localStorage.removeItem(this.tokenKey);
      sessionStorage.removeItem(this.tokenKey);
      // Don't remove rememberMe preference
      this.currentUserSubject.next(null);
      this.router.navigate(['/login']);
    }
  }
}
