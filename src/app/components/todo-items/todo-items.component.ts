import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {TodoService} from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';


@Component({
  selector: 'app-todo-items',
  templateUrl: './todo-items.component.html',
  styleUrls: ['./todo-items.component.css']
})
export class TodoItemsComponent implements OnInit {
  @Input()
  todo: Todo = new Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();
  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }
  //set Dynamic classes
  setClasses(){
    let classes={
      todo: true,
      'is-complete': this.todo.completed
    }

    return classes;
  }
  onToggle(todo: Todo) {
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo => console.log(todo));
  }

  doDelete(todo: Todo | undefined) {
    this.deleteTodo.emit(todo);
  }
}
