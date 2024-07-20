import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class LoginComponent{

 loginObj:any = {}

  AuthService = inject(AuthService);
  router= inject(Router);

  login(event : Event){
    event.preventDefault();
    const email = this.loginObj.Email;
    const password = this.loginObj.password
    this.AuthService.onLogin(email, password).subscribe((res:any) =>{
      if(res){
        if (res.role === 'simple-user') {
          alert("We're still reviewing your application to our company");
          this.AuthService.storeUserData(res.token)
        }else{
        this.AuthService.storeUserData(res.token)//, res.userId, res.role);
        this.router.navigateByUrl("Home");}
      } else{
        console.log(res.message);
      }
    },
    (error) => {
      console.error('Error during login:', error);
      alert('Error during login. Please try again.');
    }
  );
  }
  goToSignUp(event: Event) {
    event.preventDefault();
    this.router.navigateByUrl("/signup");
}
}
