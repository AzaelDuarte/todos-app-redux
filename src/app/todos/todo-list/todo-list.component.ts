import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { filtrosValidos } from 'src/app/filtro/filtro.actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  todos:Todo[] = [];
  filtroActual!:filtrosValidos;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
    this.store.subscribe(({todos, filtro}) => {
      
      this.todos = todos.map(todo => {
        return {
          id: todo.id,
          texto: todo.texto,
          completado: todo.completado
        }
      });

      this.filtroActual = filtro;
    });
  }
}
