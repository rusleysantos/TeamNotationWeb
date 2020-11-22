import { Component, OnInit } from '@angular/core';

import { CookieService } from 'ngx-cookie-service';
import { MessageReturn } from 'src/app/models/message-return';
import { AnnotationBoardService } from 'src/app/services/annotation-board.service';

@Component({
  selector: 'app-annotation-board',
  templateUrl: './annotation-board.component.html',
  styleUrls: ['./annotation-board.component.css']
})
export class AnnotationBoardComponent implements OnInit {

  idProject:number;
  project: any;

  constructor(private annotationBoardService: AnnotationBoardService, private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getProjec();
  }

  getProjec(): void {
    debugger;
    
    this.annotationBoardService.GetProject(this.cookieService.get('PROJECT_SELECT')).subscribe((returnOptions: MessageReturn) => {
      this.project = returnOptions.objectsReturn;
    });

  }

}
