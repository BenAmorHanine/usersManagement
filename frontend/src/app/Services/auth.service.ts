import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of ,Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthService{

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  onLogin(email: string, password: string):Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.baseUrl}/login`, loginData);
  }
  onSignup(username: string, email: string, password: string): Observable<any>{
    const signupData = {username,email, password };
    return this.http.post(`${this.baseUrl}/signup`, signupData);
  }
  logout(): void{
    console.log('Logout method called');
    localStorage.removeItem('authToken');
    console.log("1");
    localStorage.removeItem('userId');
    console.log("2");
    localStorage.removeItem('role');
    console.log("3");
  }
  /*storeUserData(token: string, userId: string, role: string): void {
    localStorage.setItem('authToken', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('role', role);
  }*/
  storeUserData(token: string): any {
    var extractedtoken= token.split('.')[1];
    var atobdata=atob(extractedtoken);
    var data=JSON.parse(atobdata);
    localStorage.setItem('token', token);
    localStorage.setItem('userId', data.id);
    localStorage.setItem('role', data.role);
    localStorage.setItem('createdAt', data.createdAt);
  }


  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserId(): string | null {
    return localStorage.getItem('userId');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  /*getUsername(): string | null {
    return localStorage.getItem('username');
  }*/
}
