import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'

const routes: Routes = [
  {
    path:'',
    component: HomeComponent
  },
  {
    path: '**',  //where a path visited is not in the route array, will redir to homecomp
    redirectTo: ''
  }


];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
