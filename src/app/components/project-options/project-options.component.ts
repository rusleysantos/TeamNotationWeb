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

  constructor(private projectService: ProjectService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {

    this.getProjectOptions();
  }

  getProjectOptions(): void {
    this.projectService.getProjectOptions().subscribe((returnOptions: MessageReturn) => {
      this.listOptions = returnOptions.objectsReturn;
    });

  }

  redirectAnnotationBoard(idProject: string): void {

    this.cookieService.delete('PROJECT_SELECT');
    this.cookieService.set('PROJECT_SELECT', idProject);

    this.router.navigate(['/home', {
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
