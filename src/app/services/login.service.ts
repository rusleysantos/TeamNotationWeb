import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Login } from '../models/login';
import { retry, catchError } from 'rxjs/operators';
import { MessageReturn } from '../models/message-return'


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  
  constructor(private httpClient: HttpClient) { }
  
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  LoginUser(login: Login): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>('/api/login', login, this.httpOptions);
  }

}
