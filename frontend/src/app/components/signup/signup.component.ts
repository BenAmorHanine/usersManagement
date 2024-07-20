import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupObj:any ={};
  AuthService = inject(AuthService);
  router= inject(Router);

  Signup(event: Event) {
    event.preventDefault();
    const email = this.signupObj.Email;
    const password = this.signupObj.password;
    const username = this.signupObj.username;

    this.AuthService.onSignup(username, email, password).subscribe((res: any) =>{
      if ( res.token) {
        alert("Registered successfully");
        alert("We will review your application to our company");
        this.signupObj.Email = '';
        this.signupObj.password = '';
        this.signupObj.username = '';

      } else if (res.message === 'Email already exists') {
        alert("Email already exists");
      }
    },
    (error) =>{
      alert("Registration failed");
      }
  );
  }
  goToLogin(event : Event) {
    event.preventDefault();
    this.router.navigateByUrl("login");
}
}
