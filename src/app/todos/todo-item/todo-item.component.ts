import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {

  @ViewChild('inputFisico') txtInputFisico!:ElementRef;

  @Input() todo!: Todo;

  chkCompletado!: FormControl;
  txtInput!:FormControl;

  editando = false;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {

    console.log(this.todo);
    

    this.chkCompletado = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(() => {
      this.store.dispatch(actions.toggle({id:this.todo.id}));
    });
  }

  editar():void {
    this.editando = true;

    this.txtInput.setValue(this.todo.texto);
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion():void {
    this.editando = false;

    if(this.txtInput.invalid || this.todo.texto === this.txtInput.value){
      return;
    }

    this.store.dispatch(actions.editar(
    {
      id:this.todo.id, 
      texto:this.txtInput.value
    }));
  }

  borrar():void {
    this.store.dispatch(actions.borrar({id:this.todo.id}));
  }
}
