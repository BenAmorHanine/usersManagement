import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router= inject(Router);
  navigateTo(path: string, event : Event) {
  event.preventDefault();
  this.router.navigateByUrl(path);
  }
}
