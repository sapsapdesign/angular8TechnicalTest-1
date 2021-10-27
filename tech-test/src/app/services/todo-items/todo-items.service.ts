import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Lists } from 'src/app/lists';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TodoItemsService {
  apiPath = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getAllTodo(): Observable<any> {
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
  }

  editToDo(id,list:Lists): Observable<any> {
    return this.httpClient.patch(`${this.apiPath}/`+id,list)
    .pipe(
      map((res) => {
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
        return res;
      })
    )
  }
}
