import {createReducer, on} from '@ngrx/store';

import {Todo} from "./todo.type";
import {addTodo, deleteTodo, completeTodo, setTodos, deleteTodoAfterApi} from "./todo.actions";

export const initialState: Todo[] = [];

export const todoReducer = createReducer(
  initialState,
  on(addTodo, (state, {todo}) => [...state, todo]),
  on(setTodos, (_, {todos}) => todos),
  on(deleteTodoAfterApi, (state, {id}) => state.filter(todo => todo.id !== id)),
  on(completeTodo, (state, {id}) => state.map(todo => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: true
      }
    } else {
      return todo;
    }
  }))
);
