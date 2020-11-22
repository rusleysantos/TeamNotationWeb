import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppModule } from './app.module';
import { LoginComponent } from './components/login/login.component';
import { ProjectComponent } from './components/project/project.component';
import { HomeComponent } from './components/home/home.component';
import { AnnotationBoardComponent } from './components/annotation-board/annotation-board.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children:[
      {
        path: 'project',
        component: ProjectComponent,
        outlet: 'content'
      },
      {
        path: 'annotationboard',
        component: AnnotationBoardComponent,
        outlet: 'content'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
