import { OverviewComponent } from './overview/overview.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OverviewModule { }
