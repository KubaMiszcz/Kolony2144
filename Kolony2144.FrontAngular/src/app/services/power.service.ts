import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { ResourceName } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AssetTypesEnum } from '../models/enums/Types.enum';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private powerAssets: IAsset[];

  constructor(
    private assetService: AssetService,
  ) {
  }

  getEnergyProduction(): number {
    return this.assetService.getAssetProductionQtyByName(ResourceName.Energy)
  }

  getEnergyUsage(): number {
    return this.assetService.getAssetConsumptionQtyByName(ResourceName.Energy)
  }
}
