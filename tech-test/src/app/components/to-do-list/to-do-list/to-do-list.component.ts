// import { map, switchMap, timeout } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Lists } from 'src/app/lists';
import { TodoItemsService } from 'src/app/services/todo-items/todo-items.service';
// import { BehaviorSubject, Observable } from 'rxjs';
// import { ListFilterComponent } from '../../list-filter/list-filter/list-filter.component';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  
  title:string = 'tech-test';
  lists: Lists[];
  // public filterList: any;
  public modifiedFilter: any;
  modifiedList: Lists[];
  objPatch: Lists;
  showEdit: boolean;
  successEdit: boolean;
  successAdd: boolean;

  // Info for Add to do component
  addTodoTitle:string = 'Add new Todo';
  addTodoLabel:string = 'Label';
  addTodoDesc:string = 'Description';
  addTodoCat:string = 'Category';

  data:any;

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
    this.getAllTodoList();
  }

  getAllTodoList() {
    return this.todoItemsService.getAllTodo().subscribe((data) => {
      this.todoItemsService.updateData(data);
      this.todoItemsService.share.subscribe((data) => {
        this.modifiedList = data;
      })
    })
  }

  toggleDone(id,status) {
    const task = new Lists();
    task.done = status;
    this.todoItemsService.updateDoneStatus(id,task).subscribe((data) => {
      this.modifiedList = this.modifiedList.map(item => {
        if (data.id === item.id) {        
          return {...item,done: data.done}
        } else {
          return item;
        } 
      })
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
      this.modifiedList = this.modifiedList.map(item => {
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
      this.modifiedList.forEach((value,index) => {
        if(value == item) {
          this.modifiedList.splice(index,1)
        }
      });
    });
  }

  // Add new todo from addToDo component addItemEvent in the directive
  addItem(event) {
    this.modifiedList.push(event);
  }

  filterList(event) {    
    if (event != 'All') {
      this.todoItemsService.share.subscribe((data) => {
        console.log('data',data);
        this.modifiedList = data.filter((list) => {
          return list.category == event;
        })
      });
    } else {
      this.todoItemsService.share.subscribe((data) => {
        this.modifiedList = data;
      })
    }
  }
  
}
