import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import Swal from 'sweetalert2/dist/sweetalert2.js';
import { CookieService } from 'ngx-cookie-service';
import { ExecutionTask } from 'src/app/models/execution-task';
import { MessageReturn } from 'src/app/models/message-return';
import { ExecutionTaskService } from 'src/app/services/execution-task.service';
import { StatusService } from 'src/app/services/status.service';
import { ProjectService } from 'src/app/services/project.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { debuglog } from 'util';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board.component.html',
  styleUrls: ['./task-board.component.css']
})
export class TaskBoardComponent implements OnInit {

  listTaks: any;
  listStatus: any;
  emptyTask: boolean;
  changeTask: boolean;

  taskForm = new FormGroup({
    title: new FormControl(""),
    weight: new FormControl("0"),
    effort: new FormControl("0"),
    status: new FormControl(""),
    description: new FormControl("")
  });

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.listTaks, event.previousIndex, event.currentIndex);
  }

  constructor(private _executionTaskService: ExecutionTaskService,
    private _cookieService: CookieService,
    private _statusService: StatusService) { }

  ngOnInit(): void {
    this.emptyTask = true;
    this.getTasksProject(parseInt(this._cookieService.get('PROJECT_SELECT')), 1, 100);
  }

  putExecutionTask(): void {

    const task = new ExecutionTask;
    task.idTask = parseInt(this._cookieService.get('TASK_SELECT'));
    task.title = this.taskForm.value.title;
    task.description = this.taskForm.value.description;
    task.weight = this.taskForm.value.weight.toString();
    task.effort = this.taskForm.value.effort.toString();;
    task.idStatus = parseInt(this.taskForm.value.status);
    task.idProject = parseInt(this._cookieService.get('PROJECT_SELECT'));

    this._executionTaskService.putExecutionTask(task).subscribe((returnPutExecutionTask: MessageReturn) => {

      if (returnPutExecutionTask.status) {
        Swal.fire(
          returnPutExecutionTask.title,
          returnPutExecutionTask.description,
          'success'
        )
        this.ngOnInit();
      }
      else {

        Swal.fire(
          returnPutExecutionTask.title,
          returnPutExecutionTask.description,
          'error'
        )
      }
    });

    this._cookieService.delete('TASK_SELECT','/')

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

  openModal(modal: string, idTask: string): void {

    if (modal === 'addTask') {

      this.changeTask = false;
      this.getStatusAllByType(1, 100, "TA");

      this.taskForm.patchValue({

        title: "",
        weight: "0",
        effort: "0",
        status: "",
        description: ""
      });
    }

    if (modal === 'updateTask') {

      this.changeTask = true;
      this.getStatusAllByType(1, 100, "TA");
      this.getExecutionTask(idTask);
      this._cookieService.set('TASK_SELECT', idTask);
    }

  }


  getExecutionTask(idTask: string): void {

    this._executionTaskService.getExecutionTask(idTask).subscribe((returnTask: MessageReturn) => {

      this.taskForm.patchValue({

        title: returnTask.objectsReturn.title,
        weight: returnTask.objectsReturn.weight,
        effort: returnTask.objectsReturn.effort,
        status: returnTask.objectsReturn.status,
        description: returnTask.objectsReturn.description
      });

    });

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
    task.weight = this.taskForm.value.weight.toString();
    task.effort = this.taskForm.value.effort.toString();;
    task.idStatus = parseInt(this.taskForm.value.status === "" ? 1 : this.taskForm.value.status);
    task.idProject = parseInt(this._cookieService.get('PROJECT_SELECT'));

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
