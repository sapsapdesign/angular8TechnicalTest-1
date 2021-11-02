import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { Lists } from 'src/app/lists';
import { TodoItemsService } from 'src/app/services/todo-items/todo-items.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {
  @Input() label;
  @Input() description;
  @Input() category;
  @Input() title;
  @Output() newItemEvent = new EventEmitter();
  
  successAdd: any;

  listFormAdd = new FormGroup({
    label: new FormControl('',[Validators.required]),
    description: new FormControl(''),
    category: new FormControl(''),
    done: new FormControl(false),
  });

  constructor(
    private todoItemsService: TodoItemsService
  ) { }

  ngOnInit() {
    console.log(this.label);
  }

  addTask() {
    const task = new Lists();
    task.label = this.listFormAdd.value.label;
    task.description = this.listFormAdd.value.description;
    task.category = this.listFormAdd.value.category;
    task.done = this.listFormAdd.value.done;

    this.todoItemsService.addToDo(task).subscribe((data) => {
      // this.updateModifiedData();
      // this.updateModifiedData = data;
      this.newItemEvent.emit(data);
      this.successAdd = true;
      this.listFormAdd.reset();
      setTimeout(() => {
        this.successAdd = false;
      }, 3000);
    })
  }

  reset() {
    this.listFormAdd.reset();
  }

}
