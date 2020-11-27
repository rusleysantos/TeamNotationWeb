import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { MessageReturn } from '../models/message-return';
import { Project } from '../models/project';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {

  constructor(private httpClient: HttpClient, private cookieService: CookieService) { }


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.cookieService.get('TOKEN_USER')}`,
    }),
  }

  addProject(project: Project): Observable<MessageReturn> {
    return this.httpClient.post<MessageReturn>('/api/AddProject', project, this.httpOptions);
  }

  getProject(idProject: string): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>(`/api/GetProject/?idProject=${idProject}`, this.httpOptions);
  }

  getProjectOptions(): Observable<MessageReturn> {
    return this.httpClient.get<MessageReturn>('/api/GetProjectOptions', this.httpOptions);
  }
  

}
