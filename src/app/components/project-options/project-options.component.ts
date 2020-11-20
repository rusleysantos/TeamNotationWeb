import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { MessageReturn } from 'src/app/models/message-return';
import { Project } from 'src/app/models/project';
import { ProjectOptionsService } from 'src/app/services/project-options.service';



@Component({
  selector: 'app-project-options',
  templateUrl: './project-options.component.html',
  styleUrls: ['./project-options.component.css']
})
export class ProjectOptionsComponent implements OnInit {

  listOptions: any;

  constructor(private projectService: ProjectOptionsService, private router: Router) { }

  ngOnInit(): void {

    this.getProjectService();
  }

  getProjectService(): void {
    this.projectService.getProjectOptions().subscribe((returnOptions: MessageReturn) => {
      this.listOptions = returnOptions.objectsReturn;
    });

  }

}
