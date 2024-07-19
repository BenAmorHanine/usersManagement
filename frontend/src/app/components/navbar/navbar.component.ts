import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  router= inject(Router);
  AuthService= inject(AuthService);


  navigateTo(path: string, event : Event) {
  event.preventDefault();
  this.router.navigateByUrl(path);
  }
  navigateToList(listType: string, event : Event) {
    event.preventDefault();
    this.router.navigateByUrl(`/${listType}`);
    }
    logout(event : Event){
      event. preventDefault();
      console.log('Logout button clicked');
      this.AuthService.logout();
      alert("Loged Out Successefully");
      this.router.navigateByUrl("login");
    }
}
