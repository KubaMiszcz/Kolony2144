import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { TradeAnnouncementComponent } from './trade-announcement/trade-announcement.component';
// import { TradeComponent } from './trade/trade.component';
// import { TradePanelComponent } from './trade-panel/trade-panel.component';
// import { TradePanelItemComponent } from './trade-panel-item/trade-panel-item.component';



@NgModule({
  declarations: [
    TradeAnnouncementComponent,
    // TradeComponent,
    // TradePanelComponent,
    // TradePanelItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    TradeAnnouncementComponent,
    // TradeComponent,
  ]
})
export class TradeModule { }
