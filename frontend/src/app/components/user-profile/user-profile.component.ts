import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { Observable } from 'rxjs';
import { User } from '../../classes/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  //user !: Observable<User[]>;
  user: User | null = null;
  usersService= inject(UsersService);
  authService = inject(AuthService);
  router = inject(Router)

  ngOnInit(): void {
    const userId = this.authService.getUserId();
    if (userId) {
      this.usersService.getUser(userId).subscribe(
        (userData: User) => {
          this.user = userData;
        },
        (error) => {
          console.error('Failed to fetch user profile', error);
          alert("Failed to fetch user profile"+ error );
        }
      );
    }else {
      console.error('User ID not found in local storage');
    }
  }
  editProfile(event:Event) {
    event.preventDefault;
    this.router.navigateByUrl('edit-profile');
  }

  confirmDelete( event: Event) {
    event.preventDefault();
    if (confirm('Are you sure you want to delete your account?')) {
      const userId = this.authService.getUserId(); // Obtenez l'ID de l'utilisateur à partir du token JWT
      if (userId) {
        this.usersService.delete().subscribe(
          () => {
            alert('Account deleted successfully');
            this.router.navigateByUrl('login');
          },
          (error) => {
            console.error('Failed to delete user account', error);
            alert('Failed to delete user account');
          }
        );
      } else {
        console.error('User ID not found in token');
      }
    }
  }
}
