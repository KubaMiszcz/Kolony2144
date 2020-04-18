import { KolonyService } from './../services/kolony.service';
import { ICountableEntity } from 'src/app/models/Entity';
import { Injectable } from '@angular/core';
import { ResourceName } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { CommonService } from '../services/common.service';
import { AssetService } from '../assets-module/asset.service';
import { SharedService } from '../services/shared.service';
import { BuildingService } from '../buildings-module/building.service';
import { EntityService } from '../services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  powerSources: ICountableEntity[] = [];
  powerConsumers: ICountableEntity[] = [];

  // todo add brownou and blackout when overload
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
    // fixit it counts all except buildings - fixit somehow
    return this.entityService.getEntityProductionQtyByName(ResourceName.Energy);
  }

  getEnergyUsage(): number {
    // fixit it counts all except buildings - fixit somehow
    return this.entityService.getEntityConsumptionQtyByName(ResourceName.Energy);
  }
}
