import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
import { ExecutionTask } from 'src/app/models/execution-task';
import { MessageReturn } from 'src/app/models/message-return';
import { ExecutionTaskService } from 'src/app/services/execution-task.service';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  listTaks: any;
  listStatus: any;
  emptyTask: boolean;
  typeModal:string;

  taskForm = new FormGroup({
    title: new FormControl(""),
    weight: new FormControl(""),
    effort: new FormControl(""),
    status: new FormControl(""),
    description: new FormControl("")
  });

  constructor(private _executionTaskService: ExecutionTaskService, private _cookieService: CookieService, private _statusService: StatusService) { }

  ngOnInit(): void {
    this.emptyTask = true;
    this.getTasksProject(parseInt(this._cookieService.get('PROJECT_SELECT')), 1, 100);
  }

  getTasksProject(idProject: number, page: number, size: number): void {

    this._executionTaskService.getTasksProject(idProject, page, size).subscribe((returnOptions: MessageReturn) => {
      this.listTaks = returnOptions.objectsReturn;

      if (this.listTaks.length === 0) {
        this.emptyTask = true;
      }
      else {

        this.emptyTask = false;
      }

    });

  }

  openModal(modal: string): void {
debugger;
    if ('addTask') {

      this.getStatusAllByType(1, 100, "TA");
      this.typeModal = modal;
    }

  }

  getStatusAllByType(page: number, size: number, type: string): void {

    this._statusService.getStatusAllByType(page, size, type).subscribe((returnOptions: MessageReturn) => {

      this.listStatus = returnOptions.objectsReturn;

    });

  }

  addTaskProject(): void {

    const task = new ExecutionTask;
    task.title = this.taskForm.value.title;
    task.description = this.taskForm.value.description;
    task.weight = this.taskForm.value.weight;
    task.effort = this.taskForm.value.effort;
    task.idStatus = parseInt(this.taskForm.value.status);
    task.idProject = parseInt(this._cookieService.get('PROJECT_SELECT'));

    debugger;

    this._executionTaskService.addTaskProject(task).subscribe((returnExecutionTask: MessageReturn) => {

      if (returnExecutionTask.status) {

        Swal.fire(
          returnExecutionTask.title,
          returnExecutionTask.description,
          'success'
        )
        this.ngOnInit();

        this.taskForm.patchValue({
          title: "",
          description: "",
          weight: "",
          effort: "",
          idStatus: "",
        });


      }
      else {

        Swal.fire(
          returnExecutionTask.title,
          returnExecutionTask.description,
          'error'
        )
      }

    });
  }
}
