import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent implements OnInit {
  @Input() public filterData;
  constructor() { }

  ngOnInit() {
    console.log('will test',this.filterData)
  }

}
