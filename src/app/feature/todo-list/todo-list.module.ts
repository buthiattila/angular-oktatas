import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {todoReducer} from './todo.reducer';
import {TodoEffects} from './todo.effects';

import {TodoListComponent} from "./todo-list.component";

@NgModule({
  declarations: [
    TodoListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreModule.forRoot({todos: todoReducer}),
    EffectsModule.forRoot([TodoEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),
  ]
})
export class TodoListModule {
}
