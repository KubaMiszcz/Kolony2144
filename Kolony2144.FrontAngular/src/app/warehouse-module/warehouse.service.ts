import { Injectable } from '@angular/core';
import { IEntity, IAsset } from '../models/Entity';
import { CommonService } from '../services/common.service';
import { SharedService } from '../services/shared.service';
import { EntityService } from '../services/entity.service';
import { AssetService } from '../assets-module/asset.service';
import { BuildingService } from '../buildings-module/building.service';
import { KolonyService } from '../services/kolony.service';
import { ResourceName } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  storedItems: IEntity[];
  storageProviders: IEntity[];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService,
    private buildingService: BuildingService,
    private kolonyService: KolonyService
  ) {
    this.storedItems = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.StorageSpace);
    this.storageProviders = this.entityService.getEntitiesByProducedAssetNameFromList(ResourceName.StorageSpace);
  }

  get totalStorageCapacity(): number {
    return this.entityService.getEntityProductionQtyByName(ResourceName.StorageSpace);
  }

  get totalStorageUsage(): number {
    return this.entityService.getEntityConsumptionQtyByName(ResourceName.StorageSpace);
  }
}
