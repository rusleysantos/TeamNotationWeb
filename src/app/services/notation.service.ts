import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageReturn } from '../models/message-return';
import { Annotation } from '../models/annotation';

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
    return this.httpClient.get<MessageReturn>(`api/GetAnnotations?page=${page}&size=${size}&idProject=${idProject}`, this.httpOptions);
  }

  getNotation(idNotation: number): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`/api/GetAnnotation?idNotation=${idNotation}`, this.httpOptions);
  }

  addNotation(notation: Annotation): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>(`/api/AddAnnotation`, notation, this.httpOptions);
  }

  putNotation(notation: Annotation): Observable<MessageReturn> {
    return this.httpClient.put<MessageReturn>(`/api/PutAnnotation`, notation, this.httpOptions);
  }

  deleteNotation(idNotation: number): Observable<MessageReturn> {
    return this.httpClient.delete<MessageReturn>(`/api/DeleteAnnotation?idNotation=${idNotation}`, this.httpOptions);
  }

}
