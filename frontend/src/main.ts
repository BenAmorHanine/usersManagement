import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router'; // Import if using routing
import { routes } from './app/app.routes'; // Assuming routes in this file
import { authInterceptor } from './app/Services/http-interceptor.service';


bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(withInterceptors([authInterceptor])), provideRouter(routes)],
});
