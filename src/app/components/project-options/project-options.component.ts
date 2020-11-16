import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  ProjectForm = new FormGroup({
    title: new FormControl(""),
    description: new FormControl("")
  });

  constructor(private projectService: ProjectOptionsService) { }

  ngOnInit(): void {

    //this.getProjectService();
  }

  getProjectService(): void {

    this.projectService.getProjectOptions().subscribe((returnOptions: MessageReturn) => {
      this.listOptions = returnOptions.ObjectsReturn;
    });

  }

  addProject(): void {
    debugger;

    const project = new Project;

    project.Title = this.ProjectForm.value.title;
    project.Description = this.ProjectForm.value.description;

    this.projectService.addProject(project).subscribe((projectReturn: MessageReturn) => {

    });

  }

}
