import { Injectable } from '@angular/core';
import { AssetService } from '../assets-module/asset.service';
import { IEntity } from '../models/Entity';
import { ResourceName } from '../models/Resource';
import { CommonService } from '../services/common.service';
import { EntityService } from '../services/entity.service';
import { KolonyService } from '../services/kolony.service';
import { SharedService } from '../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  cashConsumers: IEntity[] = [];
  Cash: IEntity;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService,
    private kolonyService: KolonyService,
  ) {
    this.cashConsumers = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.Cash);
    this.Cash = this.entityService.getEntityByName(ResourceName.Cash);
    this.kolonyService.KolonyStateUpdatedSubject.subscribe(data => {
      this.cashConsumers = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.Cash);
      this.Cash = this.entityService.getEntityByName(ResourceName.Cash);
    });
  }

  get totalCashConsumption() {
    return this.entityService.getTotalEntityConsumptionQtyByName(ResourceName.Cash);
  }

  getMonthlyReport(): string[] {
    const report = [];
    const consumption = this.entityService.getTotalEntityConsumptionQtyByName(this.Cash.Name);
    if (this.Cash.Quantity < 0) {
      report.push('!!! CASH RUNS OUT, BAILIFF IS COMING TO KOLONY !!!');
    }
    report.push('Expenses: ' + consumption + this.Cash.UoM
      + ', ' + this.Cash.Name + ' is enough for ' + (Math.floor(this.Cash.Quantity / consumption)) + ' months');

    return report;
  }


}

