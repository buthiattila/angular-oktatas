import {createFeatureSelector, createSelector} from "@ngrx/store";

import {Todo} from "./todo.type";

export const selectTodoState = createFeatureSelector<Todo[]>('todos')

export const selectTodos = createSelector(
  selectTodoState,
  (todos) => todos
);

export const selectCompleteTodos = createSelector(
  selectTodoState,
  (todos) => todos.filter(todo => todo.completed)
)

export const selectInCompleteTodos = createSelector(
  selectTodoState,
  (todos) => todos.filter(todo => !todo.completed)
)
