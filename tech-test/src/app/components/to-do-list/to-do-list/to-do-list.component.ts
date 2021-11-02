import { map, timeout } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lists } from 'src/app/lists';
import { TodoItemsService } from 'src/app/services/todo-items/todo-items.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  
  title = 'tech-test';
  todoList: any;
  public filterList: any;
  modifiedFilter: any = [];
  modifiedTodoList: any = [];
  objPatch: Lists;
  showEdit: any;
  successEdit: any;
  successAdd: any;

  // Info for Add to do component
  addTodoTitle = 'Add new Todo';
  addTodoLabel = 'Label';
  addTodoDesc = 'Description';
  addTodoCat = 'Category';

  listFormEdit = new FormGroup({
    label: new FormControl('',[Validators.required]),
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
      this.modifiedTodoList = this.modifiedTodoList.map(item => {
        if (data.id === item.id) {          
          return {...item,done: data.done}
        } else {
          return item;
        } 
      })
    })
  }

  updateModifiedData() {
    this.todoItemsService.getAllTodo().subscribe((data) => {
      this.modifiedTodoList = data;
    })
  }

  editTask(item) {
    // Open then populate edit form
    this.showEdit = true;
    this.successEdit = false;
    this.listFormEdit = new FormGroup({
      label: new FormControl(item.label,[Validators.required]),
      description: new FormControl(item.description),
      category: new FormControl(item.category),
      done: new FormControl(item.done),
      id: new FormControl(item.id),
    });
  }

  submitEditTask() {
    const task = new Lists();
    task.id = this.listFormEdit.value.id;
    task.label = this.listFormEdit.value.label;
    task.description = this.listFormEdit.value.description;
    task.category = this.listFormEdit.value.category;
    task.done = this.listFormEdit.value.done;
    
    this.todoItemsService.editToDo(task.id,task).subscribe((data) => {    
      // Update the data list with new changes 
      this.modifiedTodoList = this.modifiedTodoList.map(item => {
        if (data.id === item.id) {          
          return {...item,label:data.label,description: data.description,category: data.category}
        } else {
          return item;
        } 
      })
      this.successEdit = true;
      setTimeout(() => {
        this.successEdit = false;
      }, 2000);
    })
  }

  deleteTask(item) {
    this.todoItemsService.deleteTodo(item.id).subscribe((data) => { 
      this.modifiedTodoList.forEach((value,index) => {
        if(value == item) {
          this.modifiedTodoList.splice(index,1)
        }
      });
    });
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }


}
