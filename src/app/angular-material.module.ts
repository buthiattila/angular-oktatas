import {NgModule} from '@angular/core';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTableModule} from "@angular/material/table";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatListModule} from "@angular/material/list";
import {MatSliderModule} from "@angular/material/slider";
import {MatRippleModule} from "@angular/material/core";

const modules: any[] = [
  MatSlideToggleModule,
  MatInputModule,
  MatIconModule,
  MatCardModule,
  MatButtonModule,
  MatGridListModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatPaginatorModule,
  MatListModule,
  MatSliderModule,
  MatRippleModule
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
})
export class AngularMaterialModule {
}
