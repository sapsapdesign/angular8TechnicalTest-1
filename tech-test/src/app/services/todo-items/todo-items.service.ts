import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lists } from 'src/app/lists';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsService {

  apiPath = environment.apiUrl;
  listData: Lists[];

  private content = new BehaviorSubject<any>([]);
  public share = this.content.asObservable();

  constructor(private httpClient: HttpClient) { }

  updateData(data) {
    this.content.next(data);
  }

  getAllTodo(): Observable<any> {
    return this.httpClient.get<any[]>(this.apiPath)
    .pipe(
      map((res) => {
        this.listData = res;
        return this.listData;
      })
    )
  }

  updateShareList() {
    return this.httpClient.get<any[]>(this.apiPath)
    .pipe(
      map((res) => {
        return res;
      })
    )
  }

  getTodo(id): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiPath}/`+id);
  }

  addToDo(list: Lists) : Observable<any> {
    return this.httpClient.post(this.apiPath,list)
      .pipe(
        map((res) => {
          return res;
        })
      )
  }

  editToDo(id,list:Lists): Observable<any> {
    return this.httpClient.patch(`${this.apiPath}/`+id,list)
    .pipe(
      map((res) => {
        this.updateShareList().subscribe((data)=>this.content.next(data));
        return res;
      })
    )
  }

  deleteTodo(id): Observable<any>{
    return this.httpClient.delete(`${this.apiPath}/`+id)
  }

  updateDoneStatus(id,list:Lists): Observable<any>  {
    return this.httpClient.patch(`${this.apiPath}/`+id,list)
    .pipe(
      map((res) => {
        this.updateShareList().subscribe((data)=>this.content.next(data));
        return res;
      })
    )
  }

}
