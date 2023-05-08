import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import {addTodo, deleteTodo, loadTodos} from './todo.actions';
import {selectCompleteTodos, selectInCompleteTodos} from './todo.selector';
import {Todo} from "./todo.type";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {
  newTodo: string = "";
  completedTodos: Todo[] = [];
  incompleteTodos: Todo[] = [];
  todos$: Observable<Todo[]>;
  completedTodos$: Observable<Todo[]>;
  inCompletedTodos$: Observable<Todo[]>;

  constructor(private store: Store<{ todos: Todo[] }>) {
    this.store.dispatch(loadTodos());
    this.todos$ = this.store.select((state) => state.todos);
    this.completedTodos$ = this.store.select(selectCompleteTodos);
    this.inCompletedTodos$ = this.store.select(selectInCompleteTodos);

  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const newTodo: Todo = {
      id: new Date().getTime(),
      title: this.newTodo,
      completed: false
    }

    this.store.dispatch(addTodo({todo: newTodo}));
    this.newTodo = '';
  }

  deleteTodo(id: number): void {
    this.store.dispatch(deleteTodo({id}));
  }


}
