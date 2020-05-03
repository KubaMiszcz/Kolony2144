import { KolonyService } from './../services/kolony.service';
import { Injectable } from '@angular/core';
import { ResourceName } from '../models/Resource';
import { CommonService } from '../services/common.service';
import { AssetService } from '../assets-module/asset.service';
import { SharedService } from '../services/shared.service';
import { BuildingService } from '../buildings-module/building.service';
import { EntityService } from '../services/entity.service';
import { IEntity } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  powerSources: IEntity[] = [];
  powerConsumers: IEntity[] = [];

  // todo add brownou 100-120% and blackout >120% when overload
  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService,
    private buildingService: BuildingService,
    private kolonyService: KolonyService,
  ) {
    this.powerConsumers = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.Energy);
    this.powerSources = this.entityService.getEntitiesByProducedAssetNameFromList(ResourceName.Energy);

    this.kolonyService.KolonyStateUpdatedSubject.subscribe(data => {
      this.powerConsumers = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.Energy);
      this.powerSources = this.entityService.getEntitiesByProducedAssetNameFromList(ResourceName.Energy);
    });
  }

  get totalEnergyProduction(): number {
    return this.entityService.getTotalEntityProductionQtyByName(ResourceName.Energy);
  }

  get totalEnergyUsage(): number {
    return this.entityService.getTotalEntityConsumptionQtyByName(ResourceName.Energy);
  }


  getMonthlyReport(): string[] {
    const report = [];
    const resource = this.entityService.getEntityByName(ResourceName.Energy);
    const consumption = this.totalEnergyUsage;
    const production = this.totalEnergyProduction;
    if (consumption > production) {
      report.push('!!! ' + (((consumption / production) * 100) - 100).toFixed(1) + '%  OVERLOADED !!!');
    }
    // Your kolony Energy usage 6200kW is 120 % of total production 6000kW
    report.push(resource.Name + ' usage: ' + consumption + resource.UoM
      + ' (' + ((consumption / production) * 100).toFixed(1) + '%) of total ' + production + resource.UoM);

    return report;
  }


}
