import { Lists } from 'src/app/lists';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { TodoItemsService } from './todo-items.service';
import { HttpErrorResponse } from '@angular/common/http';

describe('TodoItemsService', () => {
  let httpTestCtrl: HttpTestingController;
  let dataService: TodoItemsService;

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ReactiveFormsModule
    ],
    providers: [TodoItemsService]
  }));

  beforeEach(() => {
    dataService = TestBed.get(TodoItemsService);
    httpTestCtrl = TestBed.get(HttpTestingController);
  })
  
  it('should be created', () => {
    const service: TodoItemsService = TestBed.get(TodoItemsService);
    expect(service).toBeTruthy();
  });

  it('should test HttpClient.get',() => {
    const testList: Lists[] = [
      { category: "house", description: "Clean my dirty kitchen", done: false, id: 1, label: "Kitchen Cleanup"},
      { category: "bureaucracy", description: "Start doing my taxes and contact my accountant jhon for advice", done: true, id: 2, label: "Taxes"}];

    dataService.getAllTodo().subscribe((todos)=>{
      expect(testList).toBe(todos,'should check mocked data');
    });

    const req = httpTestCtrl.expectOne(dataService.apiPath);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    
    req.flush(testList);
    // httpTestCtrl.verify()

  });

  it('should add todo',() => {

    const newTodo: Lists = { category: "Test", description: "For testing purpose", done: false, id: 100, label: "Testing"};

    dataService.addToDo(newTodo).subscribe((addedTodo)=>{
      expect(addedTodo).toBe(newTodo);
    });

    const req = httpTestCtrl.expectOne(dataService.apiPath);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    
    req.flush(newTodo);
    // httpTestCtrl.verify()

  })

  it('should test 404 error', ()=> {
    const errorMsg = 'mock 404 error occured';
    dataService.getAllTodo().subscribe(
      (data) => {
        fail('failing with error 404');
      },
      (error: HttpErrorResponse) => {
        expect(error.status).toEqual(404);
        expect(error.error).toEqual(errorMsg);
      }
    );
    const req = httpTestCtrl.expectOne(dataService.apiPath);
    req.flush(errorMsg, { status: 404, statusText: 'Not Found'});
  })
});
