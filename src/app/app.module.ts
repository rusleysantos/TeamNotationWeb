import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DragDropModule} from '@angular/cdk/drag-drop';

import { CookieService } from 'ngx-cookie-service';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AppComponent } from './app.component';
import { ProjectOptionsComponent } from './components/project-options/project-options.component';
import { ProjectComponent } from './components/project/project.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import { AnnotationBoardComponent } from './components/annotation-board/annotation-board.component';
import { TaskBoardComponent } from './components/task-board/task-board.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProjectOptionsComponent,
    ProjectComponent,
    NavBarComponent,
    HomeComponent,
    AnnotationBoardComponent,
    TaskBoardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule
    
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
