import { Component, OnInit, inject } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { User } from '../../classes/user';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit{
  user: User | null = null;
  usersService= inject(UsersService);
  router = inject(Router);
  authService = inject(AuthService);

  originalUserData: User | null = null;

  updatedUserData = {
    username: '',
    email: '',
    password: ''
  }
  constructor() { };

  ngOnInit(): void {
    const userId = this.authService.getUserId();// Obtenez l'ID de l'utilisateur à partir du token JWT
    if (userId) {
      this.usersService.getUser(userId).subscribe(
        (userData: User) => {
          this.user = userData;
          this.originalUserData = { ...userData }; // Sauvegarder les données initiales
          this.updatedUserData.username = this.user.username;
          this.updatedUserData.email = this.user.email;
        },
        (error) => {
          console.error('Failed to fetch user profile', error);
        }
      );
    } else {
      console.error('User ID not found in token');
    }
  }

  updateUser(): void {
    const dataToUpdate: any = {
      username: this.updatedUserData.username ||this.originalUserData?.username,
      email: this.updatedUserData.email || this.originalUserData?.email,
      password: this.updatedUserData.password || this.authService.getUserId()
    };


    this.usersService.updateUserAccount(dataToUpdate).subscribe(
      (updatedUser: User) => {
        // Optionally update local user object with updatedUser
        this.user = updatedUser;
        // Redirect to profile page or another page after successful update
        window.alert('Modifications enregistrées avec succès !');
        this.router.navigateByUrl('user-profile');
      },
      (error) => {
        console.error('Failed to update user', error);
      }
    );
  }
  showPassword = false;

togglePasswordVisibility(): void {
  this.showPassword = !this.showPassword;
}


}
