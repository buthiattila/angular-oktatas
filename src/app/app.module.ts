import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './feature/home/home.component';
import {LoginComponent} from './feature/login/login.component';
import {PostsComponent} from './feature/posts/posts.component';
import {PostComponent} from './feature/post/post.component';
import {InfoComponent} from './info/info.component';
import {ImageSliderComponent} from './shared/image-slider/image-slider.component';
import {HoverHighlightDirective} from './shared/hover-highlight/hover-highlight.directive';
import {SelectButtonComponent} from './shared/select-button/select-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PostsComponent,
    PostComponent,
    InfoComponent,
    ImageSliderComponent,
    HoverHighlightDirective,
    SelectButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
