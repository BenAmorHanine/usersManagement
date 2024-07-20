import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private baseUrl = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getTodos(userId:string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${userId}`);
  }

  addTask(userId:string, task: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/${userId}`, { text: task });
  }

  deleteTask(userId: string, taskId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}/${taskId}`);
  }

}
