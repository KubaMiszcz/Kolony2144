import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseOverviewComponent } from './warehouse-overview/warehouse-overview.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    WarehouseOverviewComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class WarehouseModule { }
