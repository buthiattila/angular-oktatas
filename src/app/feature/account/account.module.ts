import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AngularMaterialModule} from "src/app/angular-material.module";
import {AccountRoutingModule} from "./account-routing.module";
import {LoginComponent} from "src/app/feature/account/login/login.component";
import {RegistrationComponent} from "src/app/feature/account/registration/registration.component";

@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
  ],
  imports: [
    ReactiveFormsModule,
    AngularMaterialModule,
    FormsModule,
    FlexLayoutModule,
    AccountRoutingModule
  ]
})
export class AccountModule {
}
