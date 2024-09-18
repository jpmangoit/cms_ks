import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/intercepter/auth.interceptor';
import { provideToastr } from 'ngx-toastr';

//to use toaster inside the angular18 we must include providetoastr,provideanimation inside this config file
//also to use intercaptor we must include in this file
export const appConfig: ApplicationConfig = {
  providers: [
    // provideAnimations(), // required animations providers
    provideToastr({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // Toastr providers
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    // MatButtonModule // Add MatSnackBarModule to the providers array

  ]
};
