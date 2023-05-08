import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AngularMaterialModule} from "src/app/angular-material.module";
import {AccountRoutingModule} from "./account-routing.module";
import {LoginComponent} from "src/app/feature/account/login/login.component";
import {RegistrationComponent} from "src/app/feature/account/registration/registration.component";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    AccountRoutingModule,
    SweetAlert2Module
  ]
})
export class AccountModule {
}
