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
}

/*
export class AuthService {

  private baseUrl = 'http://localhost:3000';
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(@Inject(HttpClient) private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      //return this.http.post<any>(`/api/login`, credentials).pipe(
      tap({
        next: (response) => {
          if (response.success) {
            this.isLoggedInSubject.next(true);
          } else {
            console.error('Login failed:', response.message);
          }
        },
        error: (error) => {
          console.error('Login error:', error);
          // Handle error gracefully and display user-friendly message
        },
      })
    );
  }

  signUp(userData: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/signup`, userData);
  }
  logout(): void {
    // Implement logout logic
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.getValue();
  }

}
*/
