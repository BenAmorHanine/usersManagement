import { Component, inject, OnInit } from '@angular/core';

import { TodoService } from '../../Services/todo.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../../Services/auth.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

interface Task {
  text: string;
  completed: boolean;
}


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  todos: any[] = [];

  newTask: string = '';
  tasks: Task[] = [];
  userId! :string;

  TodoService= inject(TodoService);
  AuthService=inject(AuthService);

  ngOnInit(): void {

      this.loadTodos();
  }

  loadTodos(): void {
    const userId = this.AuthService.getUserId() ;
    console.log(userId);
    if (userId) {
    this.TodoService.getTodos(userId).subscribe(
      data => {
      console.log('Received todos:', data);
      this.todos = data.tasks || [];
    },err=>{
      console.log('error:',err);

    }
  );}
  }

  addTask(): void {
    const userId = this.AuthService.getUserId() ||'' ;
    if (this.newTask.trim()) {
      console.log("addding");
      this.TodoService.addTask(userId,this.newTask).subscribe(() => {
        this.newTask = '';
        this.loadTodos();
      });
    }else{
      console.log("empty");
    }
  }

  deleteTask(taskId: string): void {
    const userId = this.AuthService.getUserId() ||'' ;
    this.TodoService.deleteTask(userId,taskId).subscribe(
      () => {
      this.loadTodos();
    }, (error) => {
      console.error('Error deleting task:', error);
    });
  }
  deleteTask2(task: Task) {
    this.tasks = this.tasks.filter(t => t !== task);
  }
  toggleTaskCompletion(task: Task) {
    task.completed = !task.completed;
  }

}
