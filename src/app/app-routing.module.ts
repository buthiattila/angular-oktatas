import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuardService} from './core/services/auth/auth-guard.service';
import {InfoComponent} from './info/info.component';
import {HomeComponent} from './feature/home/home.component';
import {PostsComponent} from './feature/blog/posts/posts.component';
import {PostComponent} from './feature/blog/post/post.component';
import {PostListComponent} from "./feature/blog/post-list/post-list.component";
import {ProductCategoriesComponent} from "./feature/product/product-categories/product-categories.component";

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'account', loadChildren: () => import('src/app/feature/account/account.module').then(m => m.AccountModule)},
  {path: 'product/categories', component: ProductCategoriesComponent, canActivate: [AuthGuardService]},
  {path: 'blog/posts', component: PostsComponent, canActivate: [AuthGuardService]},
  {path: 'blog/post-list', component: PostListComponent, canActivate: [AuthGuardService]},
  {path: 'blog/post/:id', component: PostComponent, canActivate: [AuthGuardService]},
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
