import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AngularMaterialModule} from "src/app/angular-material.module";
import {BlogRoutingModule} from "./blog-routing.module";
import {PostsComponent} from "./posts/posts.component";
import {PostComponent} from "./post/post.component";

@NgModule({
  declarations: [
    PostsComponent,
    PostComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    BlogRoutingModule
  ]
})
export class BlogModule {
}
