import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { authGuard } from './guards/auth.guard';

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
 {path: 'users-list', component: UserListComponent}

];

export const routes = Routes;
