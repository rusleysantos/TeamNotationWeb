import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { ExecutionTask } from '../models/execution-task';
import { MessageReturn } from '../models/message-return';

@Injectable({
  providedIn: 'root'
})
export class ExecutionTaskService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
    }),
  }

  getTasksProject(idProject: number, page: number, size: number): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`/api/GetTasksProject?idProject=${idProject}&page=${page}&size=${size}`, this.httpOptions);
  }

  addTaskProject(task: ExecutionTask): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>('/api/AddTaskProject', task, this.httpOptions);
  }

}
