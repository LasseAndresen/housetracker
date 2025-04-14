import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideZoneChangeDetection
} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation} from '@angular/router';

import { routes } from './app.routing.module';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withFetch, withInterceptors} from "@angular/common/http";
import {authInterceptor} from "./interceptors/auth.interceptor";
import {InitializationService} from "./auth/initialization.service";

// Factory function for APP_INITIALIZER
function initializeAppFactory(initService: InitializationService) {
  return () => initService.initializeAuth();
}

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withEnabledBlockingInitialNavigation()),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideHttpClient(withFetch(), withInterceptors([authInterceptor])),
    provideAppInitializer(async () => await initializeAppFactory(inject(InitializationService))()),
  ]
};
