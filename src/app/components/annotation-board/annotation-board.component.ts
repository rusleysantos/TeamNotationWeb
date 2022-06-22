import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';
import { MessageReturn } from 'src/app/models/message-return';
import { Annotation } from 'src/app/models/annotation';
import { Project } from 'src/app/models/project';
import { NotationService } from 'src/app/services/notation.service';
import { ProjectService } from 'src/app/services/project.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-annotation-board',
  templateUrl: './annotation-board.component.html',
  styleUrls: ['./annotation-board.component.css']
})
export class AnnotationBoardComponent implements OnInit {

  idProject: number;
  project: Project;
  listNotations: any;
  notationChange: boolean;


  notationForm = new FormGroup({

    idAnnotation: new FormControl(""),
    title: new FormControl(""),
    description: new FormControl(""),
    colorBackground: new FormControl(""),
    colorText: new FormControl("")

  });

  constructor(private _projectService: ProjectService, private _cookieService: CookieService, private _notationService: NotationService) { }

  ngOnInit(): void {
    this.getProjec();
    this.getNotations();
    this.notationChange = false;
  }

  getProjec(): void {

    this._projectService.getProject(this._cookieService.get('PROJECT_SELECT')).subscribe((messageReturn: MessageReturn) => {
      this.project = messageReturn.objectsReturn;
    });

  }

  openModal(): void {

    this.notationChange = false;

    this.notationForm.patchValue({
      title: "",
      description: "",
      idAnnotation: "",
      colorBackground: "",
      colorText: ""
    });

  }

  addNotation(): void {

    this.notationChange = false;

    const notation = new Annotation;
    notation.title = this.notationForm.value.title;
    notation.description = this.notationForm.value.description;
    notation.idProject = parseInt(this._cookieService.get('PROJECT_SELECT'));
    notation.positionCard = "translate3d(6px, -803px, 0px)";
    notation.colorBackground = this.notationForm.value.colorBackground;
    notation.colorText = this.notationForm.value.colorText;

    this._notationService.addNotation(notation).subscribe((returnNotation: MessageReturn) => {

      if (returnNotation.status) {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'success'
        )
        this.ngOnInit();

        this.notationForm.patchValue({
          title: "",
          description: "",
          idAnnotation: "",
          colorBackground: "",
          colorText: ""
        });


      }
      else {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'error'
        )
      }
    });

  }

  getNotations(): void {

    this._notationService.getNotations(1, 100, parseInt(this._cookieService.get('PROJECT_SELECT'))).subscribe((returnOptions: MessageReturn) => {
      this.listNotations = returnOptions.objectsReturn;
    });

  }

  getNotation(idNotation: number): void {

    this._notationService.getNotation(idNotation).subscribe((returnNotation: MessageReturn) => {
      this.notationForm.patchValue({

        idAnnotation: returnNotation.objectsReturn.idAnnotation,
        title: returnNotation.objectsReturn.title,
        description: returnNotation.objectsReturn.description,
        colorBackground: returnNotation.objectsReturn.colorBackground,
        colorText: returnNotation.objectsReturn.colorText
      });

    });

    this.notationChange = true;

  }

  putNotation(): void {

    const notation = new Annotation;
    notation.idAnnotation = this.notationForm.value.idAnnotation;
    notation.title = this.notationForm.value.title;
    notation.description = this.notationForm.value.description;
    notation.colorBackground = this.notationForm.value.colorBackground;
    notation.colorText = this.notationForm.value.colorText;

    this._notationService.putNotation(notation).subscribe((returnNotation: MessageReturn) => {

      if (returnNotation.status) {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'success'
        )
        this.ngOnInit();

        this.notationForm.patchValue({

          title: "",
          description: "",
          idAnnotation: ""
        });
      }
      else {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'error'
        )
      }

    });

  }


  deleteNotation(idNotation: number): void {

    this._notationService.deleteNotation(idNotation).subscribe((returnNotation: MessageReturn) => {

      if (returnNotation.status) {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'success'
        )
        this.ngOnInit();
      }
      else {

        Swal.fire(
          returnNotation.title,
          returnNotation.description,
          'error'
        )
      }

    });

  }

  changeNotationPosition(idAnnotation: number, messageEl: any): void {

    const element = messageEl
      .getAttribute('style')
      .replaceAll('transform: ', '')
      .replaceAll(';', '');

    //TODO: ele está pegando todos os estilos e separando apenas o referente a posicionamento, encontrar melhor forma
    const elementTransform = element.substring(element.indexOf("translate3d"), element.lastIndexOf(")")+1);

    const notation = new Annotation;
    notation.idAnnotation = idAnnotation;
    notation.positionCard = elementTransform;
    notation.idProject = parseInt(this._cookieService.get('PROJECT_SELECT'));
    //notation.positionCard = element.style.fontSize;

    this._notationService.putNotation(notation).subscribe((returnNotation: MessageReturn) => {

    });


  }

}
