import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/services/guards/auth-guard/auth-guard.service';
import { HomeComponent } from './feature/home/home.component';
import { LoginComponent } from './feature/login/login.component';
import { PostComponent } from './feature/post/post.component';
import { PostsComponent } from './feature/posts/posts.component';

const routes: Routes = [

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'posts',
    component:PostsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'post/:id',
    component:PostComponent,
    canActivate: [AuthGuardService]
  },
  {
    path:'',
    redirectTo:'/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo:'/home'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
