import { TradeModule } from '../trade-module/trade.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverviewComponent } from './overview/overview.component';
import { SharedModule } from '../shared/shared.module';
import { AnnouncementsComponent } from './news/announcements/announcements.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { ProductionComponent } from './production/production.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { CrewComponent } from './crew/crew.component';
import { NewsComponent } from './news/news.component';
import { MachinesComponent } from './machines/machines.component';
import { MiningComponent } from './mining/mining.component';
import { TradeComponent } from './trade/trade.component';

@NgModule({
  declarations: [
    OverviewComponent,
    AnnouncementsComponent,
    BuildingsComponent,
    MachinesComponent,
    ProductionComponent,
    WarehouseComponent,
    CrewComponent,
    NewsComponent,
    MiningComponent,
    TradeComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    TradeModule
  ],
  exports: [
    OverviewComponent,
    AnnouncementsComponent,
  ]
})
export class MainModule { }
