import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; // Import RouterModule
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, RouterModule,ReactiveFormsModule,FormsModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit{

  user !: Observable<User[]>;
  listType: string = '';

  usersService= inject(UsersService);
  ActivatedRoute= inject(ActivatedRoute);
  router = inject(Router);


 ngOnInit() {
  this.ActivatedRoute.data.subscribe(data => {
    this.listType = data['listType'];
    this.user = this.usersService.getUsersByListType(this.listType);
  });
  }
  editUser(data: string, event: Event){
event.preventDefault();
this.router.navigateByUrl("edit-user/"+data);
  }

  deleteUser(id: string, event: Event){
    event.preventDefault();
    if (confirm('Are you sure you want to delete this user ?')) {
        this.usersService.deleteById(id).subscribe(
          () => {
            alert('Account deleted successfully');
          },
          (error) => {
            console.error('Failed to delete user account', error);
            alert('Failed to delete user account');
          })
      } else {
        console.error('User ID not found in token');
      }
    }

}
