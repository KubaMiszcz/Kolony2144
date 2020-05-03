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

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private entityService: EntityService,
    private kolonyService: KolonyService,
    private tradeService: TradeService,
    private powerService: PowerService
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
    let resource: IEntity;
    let consumption: number;
    let production: number;
    let msg: string;

    // fix move it to proper services like in construction
    // future inne newsy
    // przy okazji
    // stalo sie jakies wydarzenie - piraci trzesieni ziemi itp
    // cos znaleziono zloza diamnety itp skarb


    this.AddNews('Welcome in new month. Current time is ' + this.kolonyService.Kolony.Age.toFixed(1) + ' of New Era');

    // news about ship
    this.AddNews(this.tradeService.tradeAnnouncement);

    this.AddNews('');
    this.AddNews(' ======================== Monthly report ========================');

    // news about cash
    resource = this.entityService.getEntityByName(ResourceName.Cash);
    consumption = this.entityService.getTotalEntityConsumptionQtyByName(resource.Name);
    if (resource.Quantity < 0) {
      this.AddNews('!!! CASH RUNS OUT, BAILIFF IS COMING TO KOLONY !!!');
    }
    msg = 'Expenses: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.AddNews(msg);

    // news about food
    resource = this.entityService.getEntityByName(ResourceName.Food);
    consumption = this.entityService.getTotalEntityConsumptionQtyByName(resource.Name);
    if (resource.Quantity < 0) {
      this.AddNews('!!! HUNGER IN KOLONY !!!');
    }
    msg = resource.Name + ' consumption: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.AddNews(msg);

    // news about power
    resource = this.entityService.getEntityByName(ResourceName.Energy);
    consumption = this.powerService.totalEnergyUsage;
    production = this.powerService.totalEnergyProduction;
    if (consumption > production) {
      msg = '!!! ' + (((consumption / production) * 100) - 100).toFixed(1) + '%  OVERLOADED !!!';
      this.AddNews(msg);
    }
    // Your kolony Energy usage 6200kW is 120 % of total production 6000kW
    msg = resource.Name + ' usage: ' + consumption + resource.UoM
      + ' (' + ((consumption / production) * 100).toFixed(1) + '%) of total ' + production + resource.UoM;
    this.AddNews(msg);

  }

}
