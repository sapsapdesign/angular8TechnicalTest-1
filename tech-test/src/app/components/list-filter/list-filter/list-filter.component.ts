import { TodoItemsService } from 'src/app/services/todo-items/todo-items.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { timeStamp } from 'console';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})

export class ListFilterComponent implements OnInit {
  @Input() public filterData;
  @Output() filterEvent = new EventEmitter();
  filterList: any;
  modifiedFilterList: [];
  
  constructor(private todoItemsService:TodoItemsService) { }

  ngOnInit() {
    this.getFiltersData();
  }

  getFiltersData() {
    this.todoItemsService.share.subscribe(resp => {
      this.filterList = resp;
    });
    
    // test.forEach(element => {
    //   modifiedFilter.push({value: element.category});
    // });
    // this.todoItemsService.getAllTodo().subscribe((data) => {
    //   let modifiedFilter = [];
    //   data.forEach(element => {
    //     modifiedFilter.push({value: element.category});
    //   });
    //   this.filterList = this.getUniqueListBy(modifiedFilter, 'value' );
    // })
  }
  filter(cat) {
    this.filterEvent.emit(cat);
  }

  getUniqueListBy(arr, key) {
    return [...new Map(arr.map(item => [item[key], item])).values()]
  }

}
