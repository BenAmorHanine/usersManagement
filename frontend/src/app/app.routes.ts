import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { adminGuard, authGuard } from './guards/auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ResearchComponent } from './components/research/research.component';

const Routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  {path : 'main', canActivate: [authGuard] ,component: MainComponent, children:[
    { path:'navbar', component:NavbarComponent},
    {path:'user-profile', canActivate: [authGuard], component: UserProfileComponent},
    {path:'footer', component: FooterComponent}
  ]
  },
 {path:'signup', component: SignupComponent},
 {path:'navbar',canActivate: [authGuard] , component: NavbarComponent},
 {path:'user-profile', component: UserProfileComponent},
 {path: 'users-list', component: UserListComponent},
 {path: 'edit-profile', component: EditProfileComponent},
 {path: 'edit-user/:id', component: EditUserComponent},
 {path: 'ResearchById', canActivate: [adminGuard] , component: ResearchComponent},

 { path: 'testors', component: UserListComponent, data: { listType: 'testors' } },
 { path: 'developers', component: UserListComponent, data: { listType: 'developers' } },
 { path: 'responsibles', component: UserListComponent, data: { listType: 'responsibles' } },
 { path: 'appliers', component: UserListComponent, data: { listType: 'appliers' } },
];

export const routes = Routes;
