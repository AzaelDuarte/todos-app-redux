import { createReducer, on } from '@ngrx/store';
import { borrar, limpiarTodos, crear, editar, toggle, toggleAll } from './todo.actions';
import { Todo } from './models/todo.model';

export const estadoInicial:Todo[] = [
    new Todo('Salvar al mundo'),
    new Todo('Vencer a Thanos'),
    new Todo('Robar escudo de capitan america')
];

export const todoReducer = createReducer(
    estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo(texto)]),
  on(borrar, (state, {id}) => state.filter(todo => todo.id !== id)),
  on(toggle, (state, { id }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }
    });
  }),

  on(editar, (state, { id, texto }) => {
    return state.map(todo => {
      if(todo.id === id) {
        return {
          ...todo,
          texto: texto
        }
      } else {
        return todo;
      }
    });
  }),

  on(toggleAll, (state, { completado }) => state.map(todo => {
    return {
      ...todo,
      completado: completado
    }
  })),

  on(limpiarTodos, state => state.filter(todo => !todo.completado))
);
