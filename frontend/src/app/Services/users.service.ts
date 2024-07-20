import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../classes/user';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000';
  authService = inject(AuthService);

  constructor(private http: HttpClient){}

  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${this.baseUrl}/users/all`)
  }

  getUser(id: string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }
  getUsersByListType(listType: string):Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/users/${listType}`)
  }

  getUserById(id: string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/users/${id}`).pipe(
      tap(user => console.log('Fetched user:', user))
  );
  }



  delete():Observable<any>{

    return this.http.delete(`${this.baseUrl}/profile`);
  }
  deleteById(id: string):Observable<any>{

    return this.http.delete(`${this.baseUrl}/users/${id}`);
  }
  removefromjobByid(id: string):Observable<any>{
    return this.http.put(`${this.baseUrl}/users/${id}/remove`, {});
  }

  updateUserAccount(userData: any): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/profile`, userData);

  }
  updateRole(id : string , role : string){
    return this.http.put(`${this.baseUrl}/users/${id}/role/${role}`,{id,role});
  }

  }

