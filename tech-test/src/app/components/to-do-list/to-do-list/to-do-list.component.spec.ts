import { AddTodoComponent } from './../../add-todo/add-todo/add-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToDoListComponent } from './to-do-list.component';
import { ListFilterComponent } from '../../list-filter/list-filter/list-filter.component';


describe('ToDoListComponent', () => {
  let component: ToDoListComponent;
  let fixture: ComponentFixture<ToDoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({ 
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ],
      declarations: [ ToDoListComponent,ListFilterComponent,AddTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
