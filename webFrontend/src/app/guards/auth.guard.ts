// src/app/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import {AuthService} from "../auth/auth.service";
import {InitializationService} from "../auth/initialization.service";
import {filter, take} from "rxjs";

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const initializationService = inject(InitializationService);
  if (!initializationService.initialized.getValue()) {
    await new Promise((res, rej) => initializationService.initialized.pipe(filter(x => x), take(1)).subscribe(() => res(null)));
  }

  console.log('Auth guard: isAuthenticated ', authService.isAuthenticated());
  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login'], {
    queryParams: { returnUrl: state.url }
  });
  return false;
};
