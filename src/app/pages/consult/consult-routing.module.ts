import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AddConsultComponent } from './add-consult/add-consult.component';


const routes: Routes = [

  {
    path: 'add',
    component: AddConsultComponent
  }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsultRoutingModule { }
