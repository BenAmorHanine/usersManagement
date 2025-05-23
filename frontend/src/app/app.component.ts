import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './Services/auth.service';

import {CommonModule} from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    NavbarComponent,
    LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
  isLoggedIn = false;
  constructor(public Auth: AuthService) { }

  onLoggedIn(loggedIn: boolean): void {
    this.isLoggedIn = loggedIn;
  }
}
