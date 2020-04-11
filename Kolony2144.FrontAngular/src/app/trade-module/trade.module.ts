import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TradeOverviewComponent } from './trade-overview/trade-overview.component';
import { ShipTradePanelComponent } from './ship-trade-panel/ship-trade-panel.component';



@NgModule({
  declarations: [
    TradeOverviewComponent,
    ShipTradePanelComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class TradeModule { }
