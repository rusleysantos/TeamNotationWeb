import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { MessageReturn } from 'src/app/models/message-return';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-annotation-board',
  templateUrl: './annotation-board.component.html',
  styleUrls: ['./annotation-board.component.css']
})
export class AnnotationBoardComponent implements OnInit {

  idProject:number;
  project: Project;

  constructor(private projectService: ProjectService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getProjec();
  }

  getProjec(): void {

    this.projectService.getProject(this.cookieService.get('PROJECT_SELECT')).subscribe((returnOptions: MessageReturn) => {
      this.project = returnOptions.objectsReturn;
    });

  }

}
