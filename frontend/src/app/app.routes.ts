import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { adminGuard, authGuard } from './guards/auth.guard';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { ResearchComponent } from './components/research/research.component';
import { HomeComponent } from './components/home/home.component';

const Routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
 {path:'signup', component: SignupComponent},
 {path:'navbar',canActivate: [authGuard] , component: NavbarComponent},
 {path:'user-profile', component: UserProfileComponent},
 {path: 'Home', component: HomeComponent, children:[
  {path:'navbar',component:NavbarComponent}]
 },
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


/*

 {path: 'main', component: MainComponent,
  children: [
  {path: 'ResearchById', canActivate: [adminGuard] , component: ResearchComponent},
   { path: 'Home', component: HomeComponent },
   {path:'user-profile', component: UserProfileComponent},
 {path: 'Home', component: HomeComponent},
   { path: 'testors', component: UserListComponent, data: { listType: 'testors' } },
   { path: 'developers', component: UserListComponent, data: { listType: 'developers' } },
   { path: 'responsibles', component: UserListComponent, data: { listType: 'responsibles' } },
   { path: 'appliers', component: UserListComponent, data: { listType: 'appliers' } },
   // Add other child routes as necessary
   { path: '', redirectTo: '/main/Home' } // Wildcard route for a 404 page
 ]
},



{ path: '**', redirectTo: '/main/Home' }




 {path: 'main', component: MainComponent,
  children: [
  {path: 'ResearchById', canActivate: [adminGuard] , component: ResearchComponent},
   { path: 'Home', component: HomeComponent },
   {path:'user-profile', component: UserProfileComponent},
   { path: 'testors', component: UserListComponent, data: { listType: 'testors' } },
   { path: 'developers', component: UserListComponent, data: { listType: 'developers' } },
   { path: 'responsibles', component: UserListComponent, data: { listType: 'responsibles' } },
   { path: 'appliers', component: UserListComponent, data: { listType: 'appliers' } },
   // Add other child routes as necessary
   { path: '', redirectTo: '/main/Home' } // Wildcard route for a 404 page
 ]
},

*/
