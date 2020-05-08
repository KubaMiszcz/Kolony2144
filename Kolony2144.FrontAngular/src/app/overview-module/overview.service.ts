import { CrewService } from './../crew-module/crew.service';
import { FinanceService } from './../finances-module/finance.service';
import { Injectable } from '@angular/core';
import { IEntity } from '../models/Entity';
import { ResourceName } from '../models/Resource';
import { CommonService } from '../services/common.service';
import { SharedService } from '../services/shared.service';
import { DataProviderService } from '../services/data-provider.service';
import { KolonyService } from '../services/kolony.service';
import { TradeService } from '../trade-module/trade.service';
import { EntityService } from '../services/entity.service';
import { PowerService } from '../power-module/power.service';

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  News: string[] = ['Greetings Commandir, welcome in your new kolony'];
  MaintenanceReport: string[] = [];
  ConstructionReport: string[] = [];
  PassiveProductionReport: string[] = [];
  ProductionReport: string[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private entityService: EntityService,
    private kolonyService: KolonyService,
    private tradeService: TradeService,
    private financeService: FinanceService,
    private powerService: PowerService,
    private crewService: CrewService
  ) { }


  clearNews() {
    this.News = [];
  }

  AddNews(val: string) {
    this.News.push(val);
  }

  AddNewsList(val: string[]) {
    this.News.push(...val);
  }

  UpdateNews() {
    // fix move it to proper services like in construction
    // future inne newsy
    // przy okazji
    // stalo sie jakies wydarzenie - piraci trzesieni ziemi itp
    // cos znaleziono zloza diamnety itp skarb


    this.AddNews('Welcome in new month. Current time is ' + this.kolonyService.Kolony.Age.toFixed(1) + ' of New Era');

    // news about ship
    this.AddNews(this.tradeService.getTradeAnnouncement());

    this.AddNews('');
    this.AddNews(' ======================== Monthly report ========================');

    // news about cash
    this.AddNewsList(this.financeService.getMonthlyReport());

    // news about food
    this.AddNewsList(this.crewService.getMonthlyReport());

    // news about power
    this.AddNewsList(this.powerService.getMonthlyReport());

    // MaintenanceReport report
    if (this.MaintenanceReport.length > 0) {
      this.AddNewsList(['', ' ======================  Maintenance Report  ======================']);
      this.AddNewsList(this.MaintenanceReport);
    }

    // construction report
    if (this.PassiveProductionReport.length > 0) {
      this.AddNewsList(['', ' ======================  PassiveProduction Report  ======================']);
      this.AddNewsList(this.ConstructionReport);
    }

    if (this.ConstructionReport.length > 0) {
      this.AddNewsList(['', ' ======================  Construction Report  ======================']);
      this.AddNewsList(this.ConstructionReport);
    }

    if (this.ProductionReport.length > 0) {
      this.AddNewsList(['', ' ======================  Production Report  ======================']);
      this.AddNewsList(this.ProductionReport);
    }

    this.AddNewsList([' ==============================================================', '']);
  }

}
