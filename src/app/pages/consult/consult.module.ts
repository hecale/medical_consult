import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { ConsultRoutingModule } from './consult-routing.module';

import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule,
  MatSortModule,MatTableModule, MatCardModule } from '@angular/material';

import { MatSelectModule } from '@angular/material/select';


import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { AddConsultComponent } from './add-consult/add-consult.component';


@NgModule({
  declarations: [AddConsultComponent],
  imports: [
    CommonModule,
    ConsultRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatSelectModule,
    MatCardModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatButtonModule
  ]
})
export class ConsultModule { }
