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
  }

  getEnergyProduction(): number {
    return this.entityService.getEntityProductionQtyByName(ResourceName.Energy);
  }

  getEnergyUsage(): number {
    return this.entityService.getEntityConsumptionQtyByName(ResourceName.Energy);
  }
}
