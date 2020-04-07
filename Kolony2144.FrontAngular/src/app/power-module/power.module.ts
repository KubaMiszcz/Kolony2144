import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PowerOverviewComponent } from './power-overview/power-overview.component';



@NgModule({
  declarations: [PowerOverviewComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    PowerOverviewComponent
  ]
})
export class PowerModule { }
