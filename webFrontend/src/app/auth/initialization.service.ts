// src/app/services/initialization.service.ts
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {BehaviorSubject, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitializationService {
  initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor(private authService: AuthService) {}

  initializeAuth(): Promise<boolean> {
    return this.authService.initializeFromStorage()
      .then(
      success => console.log('Auth initialization:', success ? 'successful' : 'no stored credentials'))
      .then(() => this.initialized.next(true))
      .then(() => true)
      .catch(error => {
        console.error('Auth initialization error:', error);
        return false; // of(false);
      });
  }
}
