import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {switchMap} from 'rxjs/operators';

import {loadTodos, addTodo, deleteTodo, setTodos, addTodoAfterApi, deleteTodoAfterApi} from './todo.actions';
import {TodoService} from './todo.service';
import {Todo} from './todo.type';

@Injectable()
export class TodoEffects {

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTodos),
      switchMap(() =>
        this.todoService.getTodos().pipe(
          switchMap((todos: Todo[]) => [
            setTodos({todos})
          ])
        )
      )
    )
  );

  addTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTodo),
      switchMap(({todo}) =>
        this.todoService.addTodo(todo).pipe(
          switchMap((todo: Todo) => [
            addTodoAfterApi({todo: todo})
          ])
        )
      )
    )
  );


  deleteTodo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTodo),
      switchMap(({id}) =>
        this.todoService.deleteTodoById(id).pipe(
          switchMap((todo: Todo) => [
            deleteTodoAfterApi({id})
          ])
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private todoService: TodoService
  ) {
  }
}
