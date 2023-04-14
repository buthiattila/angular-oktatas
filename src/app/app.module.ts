import {NgModule} from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout';

import {AppRoutingModule} from './app-routing.module';
import {AngularMaterialModule} from "./angular-material.module";
import {AccountModule} from "./feature/account/account.module";
import {TruncatePipe} from "./core/pipes/truncate.pipe";
import {SplitPipe} from "./core/pipes/split.pipe";
import {AppComponent} from './app.component';
import {HomeComponent} from './feature/home/home.component';
import {PostsComponent} from './feature/blog/posts/posts.component';
import {PostComponent} from './feature/blog/post/post.component';
import {InfoComponent} from './info/info.component';
import {ImageSliderComponent} from './shared/image-slider/image-slider.component';
import {HoverHighlightDirective} from './shared/hover-highlight/hover-highlight.directive';
import {SelectButtonComponent} from './shared/select-button/select-button.component';
import {NavbarComponent} from "./feature/navbar/navbar.component";
import {FooterComponent} from "./feature/footer/footer.component";
import {AccountRoutingModule} from "./feature/account/account-routing.module";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    InfoComponent,
    ImageSliderComponent,
    HoverHighlightDirective,
    SelectButtonComponent,
    NavbarComponent,
    FooterComponent,
    PostsComponent,
    PostComponent,
    TruncatePipe,
    SplitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AccountModule,
    AccountRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
