import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from "../../core/services/auth/auth-guard.service";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./post/post.component";

const routes: Routes = [
  {path: 'posts', component: PostsComponent, canActivate: [AuthGuardService]},
  {path: 'post/:id', component: PostComponent, canActivate: [AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogRoutingModule {
}
