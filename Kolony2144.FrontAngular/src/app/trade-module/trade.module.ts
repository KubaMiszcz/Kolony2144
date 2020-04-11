import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeOverviewComponent } from './trade-overview/trade-overview.component';



@NgModule({
  declarations: [TradeOverviewComponent],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TradeModule { }
