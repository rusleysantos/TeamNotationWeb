import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageReturn } from '../models/message-return';
import { Notation } from '../models/notation';

@Injectable({
  providedIn: 'root'
})
export class NotationService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
    }),
  }

  getNotations(page: number, size: number, idProject: number): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`/api/GetNotations?page=${page}&size=${size}&idProject=${idProject}`, this.httpOptions);
  }

  addNotation(notation: Notation): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>('/api/AddNotation', notation, this.httpOptions);
  }

  putNotation(notation: Notation): Observable<MessageReturn> {
    return this.httpClient.put<MessageReturn>('/api/PutNotation', notation, this.httpOptions);
  }

}
