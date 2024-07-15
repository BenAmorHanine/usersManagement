import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  onLogin(email: string, password: string) {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }
  onSignup(username: string, email: string, password: string){
    const signupData = {username,email, password };
    return this.http.post(`${this.baseUrl}/signup`, signupData);
  }

  }
