import { Injectable } from '@angular/core';
import { ResourceName } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { SharedService } from '../services/shared.service';
import { AssetService } from '../assets-module/asset.service';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private powerAssets: IAsset[] = [];
  // todo add brownou and blackout when overload
  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
  ) {
  }

  getEnergyProduction(): number {
    return this.assetService.getAssetProductionQtyByName(ResourceName.Energy);
  }

  getEnergyUsage(): number {
    return this.assetService.getAssetConsumptionQtyByName(ResourceName.Energy);
  }
}
