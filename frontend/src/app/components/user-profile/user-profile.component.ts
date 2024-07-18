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
    const userId = this.authService.getUserId(); // Assuming AuthService has a method to get user ID
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
  /*ngOnInit() {
    const userId = this.authService.getUserId();
    if (userId) {
      this.user = this.getUserById(userId);
    } else {
      this.router.navigate(['/login']);
    }
  }
  getUserById(id: string): Observable<any>{
    return this.usersService.getUser(id);
  }*/
}
