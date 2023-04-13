import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './core/services/auth/auth-guard.service';
import {InfoComponent} from './info/info.component';
import {HomeComponent} from './feature/home/home.component';
import {RegistrationComponent} from "./feature/account/registration/registration.component";
import {LoginComponent} from './feature/account/login/login.component';
import {PostsComponent} from './feature/blog/posts/posts.component';
import {PostComponent} from './feature/blog/post/post.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuardService]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuardService]},
  {path: 'info', component: InfoComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
