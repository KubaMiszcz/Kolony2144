import { Injectable } from '@angular/core';
import { ICountableEntity } from '../models/Entity';
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
  News: string[] = [];

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

  UpdateNews() {
    let resource: ICountableEntity;
    let consumption: number;
    let production: number;
    let msg: string;

    this.AddNews('Welcome in new month. Current time is ' + this.kolonyService.Kolony.Age + ' of New Era');

    // news about ship
    this.AddNews(this.tradeService.tradeAnnouncement);

    this.AddNews('');
    this.AddNews(' ======================== Monthly report ========================');

    // news about cash
    resource = this.entityService.GetEntityByName(ResourceName.Cash);
    consumption = this.entityService.GetEntityConsumptionQtyByName(resource.Name);
    if (resource.Quantity < 0) {
      this.AddNews('!!! CASH RUNS OUT, BAILIFF IS COMING TO KOLONY !!!');
    }
    msg = 'Expenses: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.AddNews(msg);

    // news about food
    resource = this.entityService.GetEntityByName(ResourceName.Food);
    consumption = this.entityService.GetEntityConsumptionQtyByName(resource.Name);
    if (resource.Quantity < 0) {
      this.AddNews('!!! HUNGER IN KOLONY !!!');
    }
    msg = resource.Name + ' consumption: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.AddNews(msg);

    // news about power
    resource = this.entityService.GetEntityByName(ResourceName.Energy);
    consumption = this.powerService.GetEnergyUsage();
    production = this.powerService.GetEnergyProduction();
    if (consumption > production) {
      msg = '!!! ' + (((consumption / production) * 100) - 100).toFixed(1) + '%  OVERLOADED !!!';
      this.AddNews(msg);
    }
    // Your kolony Energy usage 6200kW is 120 % of total production 6000kW
    msg = resource.Name + ' usage: ' + consumption + resource.UoM
      + ' (' + ((consumption / production) * 100).toFixed(1) + '%) of total ' + production + resource.UoM;
    this.AddNews(msg);

    this.AddNews(' ==============================================================');
  }

}
