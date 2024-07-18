import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../classes/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient){}

  getUsers():Observable<User[]>
  {
    return this.http.get<User[]>(`${this.baseUrl}/users/all`)
  }

  getUser(id: string):Observable<User>{
    return this.http.get<User>(`${this.baseUrl}/profile`);
  }

  delete(id: string){
    return this.http.delete(`${this.baseUrl}/profile/${id}`);
  }
  }

  /*
  getUser(id: string):Observable<User>  {
    const url = `${this.baseUrl}/profile/${id}`;
    return this.http.get<User>(url);
  }
    update(data:any){
    return this.http.put(`${this.baseUrl}/profile`, data)
  }*/
