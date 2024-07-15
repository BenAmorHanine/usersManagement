import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from "../role-list/role-list.component";
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [CommonModule, RoleListComponent, FormsModule]
})
export class LoginComponent{


  /*loginObj:any ={
    "Email": "",
    "password": ""
  }*/
 loginObj:any = {}

  AuthService = inject(AuthService);
  router= inject(Router);

  login(){
    const email = this.loginObj.Email;
    const password = this.loginObj.password
    this.AuthService.onLogin(email, password).subscribe((res:any) =>{
      if(res.result){
        this.router.navigateByUrl("main");
      } else{
        console.log(res.message);
        alert("sorry");
      }
    }
  )
  }
  goToSignUp() {
    this.router.navigateByUrl("signup");
}
}
