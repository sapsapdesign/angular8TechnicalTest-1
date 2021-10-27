import { TodoItemsService } from './services/todo-items/todo-items.service';
import { Component } from '@angular/core';
import { Lists } from './lists';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'To Do List';
  todoList: any;
  filterList: any;
  modifiedFilter: any = [];
  modifiedTodoList: any = [];
  objPatch: Lists;
  showEdit: any;
  successEdit: any;

  listFormAdd = new FormGroup({
    label: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    done: new FormControl(false),
  });

  listFormEdit = new FormGroup({
    label: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    done: new FormControl(),
    id: new FormControl(''),
  });

  constructor(
    private todoItemsService: TodoItemsService
  ) {}
  
  ngOnInit() {
    this.getToDoLists();
  }

  getToDoLists() {
    this.todoItemsService.getAllTodo().subscribe((data) => {
      this.todoList = data;
      this.modifiedTodoList = data;
      this.modifiedTodoList.forEach(element => {
        this.modifiedFilter.push({value: element.category});
      });
      this.filterList = this.getUniqueListBy(this.modifiedFilter, 'value' );
    })
  }

  filter(cat) {
    if (cat == 'All') {
      this.updateModifiedData();
    } else {
      this.todoItemsService.getAllTodo().subscribe((data) => {
        this.modifiedTodoList = data.filter((item) => {
          return item.category == cat;
        });
      })
    }
  }
  
  toggleDone(id,status) {
    const task = new Lists();
    task.done = status;
    this.todoItemsService.updateDoneStatus(id,task).subscribe((data) => {
    })
  }

  updateModifiedData() {
    this.todoItemsService.getAllTodo().subscribe((data) => {
      this.modifiedTodoList = data;
    })
  }

  addTask() {
    const task = new Lists();
    task.label = this.listFormAdd.value.label;
    task.description = this.listFormAdd.value.description;
    task.category = this.listFormAdd.value.category;
    task.done = this.listFormAdd.value.done;

    this.todoItemsService.addToDo(task).subscribe((data) => {
      this.updateModifiedData();
    })
  }

  editTask(id) {
    this.showEdit = true;
    this.successEdit = false;
    this.todoItemsService.getTodo(id).subscribe((data) => {
      this.listFormEdit = new FormGroup({
        label: new FormControl(data.label),
        description: new FormControl(data.description),
        category: new FormControl(data.category),
        done: new FormControl(data.done),
        id: new FormControl(data.id),
      });
    })
  }
  submitEditTask() {
    const task = new Lists();
    task.label = this.listFormEdit.value.label;
    task.description = this.listFormEdit.value.description;
    task.category = this.listFormEdit.value.category;
    task.done = this.listFormEdit.value.done;
    
    this.todoItemsService.editToDo(this.listFormEdit.value.id,task).subscribe((data) => {
      this.successEdit = true;
      this.updateModifiedData();
    })
  }

  deleteTask(id) {
    this.todoItemsService.deleteTodo(id).subscribe((data) => {
      this.updateModifiedData();
    });
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

}
