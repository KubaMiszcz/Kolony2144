import { PowerModule } from './power-module/power.module';
import { CrewModule } from './crew-module/crew.module';
import { BuildingsModule } from './buildings-module/buildings.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { WikiModule } from './wiki-module/wiki.module';
import { OverviewModule } from './overview-module/overview.module';
import { FinancesModule } from './finances-module/finances.module';
import { TradeModule } from './trade-module/trade.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,

    OverviewModule,
    TradeModule,
    FinancesModule,
    PowerModule,
    CrewModule,
    BuildingsModule,
    WikiModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
