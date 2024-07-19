import { Component, inject, OnInit } from '@angular/core';
import { User } from '../../classes/user';
import { UsersService } from '../../Services/users.service';
import { AuthService } from '../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent implements OnInit{

  usersService= inject(UsersService);
  authService = inject(AuthService);
  router = inject(Router);
  activatedRoute= inject(ActivatedRoute);

  fb= inject( FormBuilder);

  user: User | null = null;
  userId: string| null = null ;

  ngOnInit(): void {
    this.userId = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.userId) {
      this.usersService.getUserById(this.userId).subscribe(
        (userData: User) => {
          this.user = userData;
        },
        (error) => {
          console.error('Failed to fetch user profile', error);
          alert("Failed to fetch user profile  "+ error );
        }
      );
    }else {
      console.error('User ID not found in local storage');
    }
  }

  changedata(event: Event){}

  updateRole(id : string, role: string, event: Event){
    event.preventDefault();
    this.usersService.updateRole(id, role).subscribe({
      next: (response) => {
        console.log('Role updated successfully', response);
        alert("Role updated successfully");
        // Handle success (e.g., show a success message or update the UI)
      },
      error: (error) => {
        console.error('Error updating role', error);
        alert("Error updating role "+ error);
      }
    });

  }
  layOff(id: string, event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to lay off this user  ?')) {
        this.usersService.removefromjobByid(id).subscribe(
          () => {
            alert('Worker layed off successfully');
            this.router.navigateByUrl("users-list")
          },
          (error) => {
            console.error('Failed to dismiss user ', error);
            alert('Failed to dismiss user ');
          })
      } else {
        console.error('User ID not found in token');
      }
  }
}
