import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  user !: Observable<User[]>;
  usersService= inject(UsersService);
  router = inject(Router);


 ngOnInit() {
    this.user = this.usersService.getUsers();
  }
  editUser(data: string, event: Event){
event.preventDefault();
this.router.navigateByUrl("editUser");
  }

  deleteUser(data: string, event: Event){
    event.preventDefault();
    this.usersService.delete(data);
  }

}
