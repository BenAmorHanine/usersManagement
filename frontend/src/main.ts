import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import if using routing
import { routes } from './app/app.routes'; // Assuming routes in this file

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(), provideRouter(routes)], // Include routing if applicable
});
