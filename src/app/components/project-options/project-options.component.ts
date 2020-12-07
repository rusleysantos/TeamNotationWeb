import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import { MessageReturn } from 'src/app/models/message-return';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
})
export class ProjectOptionsComponent implements OnInit {

  listOptions: any;

  constructor(private _projectService: ProjectService, private _router: Router, private _cookieService: CookieService) { }

  ngOnInit(): void {

    this.getProjectOptions();
  }

  getProjectOptions(): void {
    this._projectService.getProjectOptions().subscribe((returnOptions: MessageReturn) => {
      this.listOptions = returnOptions.objectsReturn;
    });

  }

  redirectAnnotationBoard(idProject: string): void {

    this._cookieService.delete('PROJECT_SELECT');
    this._cookieService.set('PROJECT_SELECT', idProject);

    this._router.navigate(['/home', {
      outlets: {
        'content': ['annotationboard']
      }
    }
    ])
    .then(() => {
      window.location.reload();
    });


  }

}
