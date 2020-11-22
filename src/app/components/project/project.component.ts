import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { CookieService } from 'ngx-cookie-service';
import { MessageReturn } from 'src/app/models/message-return';
import { Project } from 'src/app/models/project';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  ProjectForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl("")
  });

  constructor(private projectService: ProjectService, private router: Router, private cookieService: CookieService) { }

  ngOnInit(): void {
  }

  addProject(): void {


    const project = new Project;

    project.title = this.ProjectForm.value.title;
    project.description = this.ProjectForm.value.description;


    this.projectService.addProject(project).subscribe((projectReturn: MessageReturn) => {

      if (projectReturn.status) {
        Swal.fire(
          projectReturn.title,
          '',
          'success'
        )

        this.cookieService.set('PROJECT_SELECT', projectReturn.objectsReturn)

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
      else {

        Swal.fire(
          projectReturn.title,
          projectReturn.description,
          'error'
        )

      }

    });

  }

}
