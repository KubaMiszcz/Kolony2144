import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrewOverviewComponent } from './crew-overview/crew-overview.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [CrewOverviewComponent],
  imports: [
    CommonModule,
    SharedModule
  ], exports: [
    CrewOverviewComponent
  ]
})
export class CrewModule { }
