import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FooterComponent } from './components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';

const Routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'main', component: MainComponent},
  {path : '', component: MainComponent, children:[ { path:'navbar', component:NavbarComponent},
    {path:'user-profile', component: UserProfileComponent}
  ]
  },
 { path: '', component: FooterComponent},
 {path:'signup', component: SignupComponent}
];

export const routes = Routes;
