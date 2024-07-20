import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import {  RouterOutlet } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { UserListComponent } from '../user-list/user-list.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { ResearchComponent } from '../research/research.component';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HomeComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
//,NavbarComponent, HomeComponent,UserListComponent, UserProfileComponent,ResearchComponent],
