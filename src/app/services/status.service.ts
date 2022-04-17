import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StringMapWithRename } from '@angular/compiler/src/compiler_facade_interface';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageReturn } from '../models/message-return';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
    }),
  }

  getStatusAllByType(page: number, size: number, type: string): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`/api/GetStatusAllByType?page=${page}&size=${size}&type=${type}`, this.httpOptions);
  }

}
