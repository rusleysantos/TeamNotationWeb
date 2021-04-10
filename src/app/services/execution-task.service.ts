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

  urlApi: string = "https://apiteamnotation.azurewebsites.net";

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
    }),
  }

  getTasksProject(idProject: number, page: number, size: number): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`${this.urlApi}/api/GetTasksProject?idProject=${idProject}&page=${page}&size=${size}`, this.httpOptions);
  }

  addTaskProject(task: ExecutionTask): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>(`${this.urlApi}/api/AddTaskProject`, task, this.httpOptions);
  }

  getExecutionTask(idTask: string): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`${this.urlApi}/api/GetExecutionTask?idTask=${idTask}`, this.httpOptions);
  }

  putExecutionTask(task: ExecutionTask): Observable<MessageReturn> {
    return this.httpClient.put<MessageReturn>(`${this.urlApi}/api/PutExecutionTask`, task, this.httpOptions);
  }

}
