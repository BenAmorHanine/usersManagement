import { Component, inject } from '@angular/core';
import { UsersService } from '../../Services/users.service';
import { User } from '../../classes/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-research',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './research.component.html',
  styleUrl: './research.component.scss'
})
export class ResearchComponent {
  userData!: User;
  userId: string = '';
  errorMessage: string = '';

  usersService= inject (UsersService);
  /*onSubmit(userId: string) {
    this.usersService.getUserById(userId).subscribe(
      (data : User) => {
        this.userData = data;
        console.log(data);
      },
      (error: any) => {
        console.error('Error fetching user data', error);
      }
    );
  }*/
    onSubmit(): void {
      if (this.userId) {
        this.usersService.getUserById(this.userId).subscribe(
          (data: User) => {
            this.userData = data;
          },
          (error: any) => {
            console.error('Error fetching user data', error);
          }
        );
      }
    }
    fetch(event: Event): void {
      event.preventDefault(); // Ensure parentheses are included
      if (this.userId) { // Check if userId is not empty
        this.usersService.getUserById(this.userId).subscribe(
          (data: User) => {
            if (data) {
              this.userData = data;
              this.errorMessage = ''; // Clear any previous error messages
            } else {
              this.errorMessage = 'No user with this ID';
            }
          },
          (error: any) => {
            console.error('Error fetching user data', error);
            this.errorMessage = 'Error fetching user data, Please enter a valid User ID';
          }
        );
      } else {
        this.errorMessage = 'Please enter a valid User ID';
      }
    }

}
