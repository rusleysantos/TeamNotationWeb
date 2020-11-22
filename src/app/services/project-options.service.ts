import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageReturn } from '../models/message-return';

@Injectable({
  providedIn: 'root'
})
export class ProjectOptionsService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
                               'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
                              }),
  }


  getProjectOptions(): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>('/api/GetProjectOptions', this.httpOptions);
  }


}
