import { KolonyService } from './../services/kolony.service';
import { ICountableEntity } from 'src/app/models/Entity';
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
  private powerAssets: ICountableEntity[] = [];
  // todo add brownou and blackout when overload
  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
    private kolonyService: KolonyService,
  ) {
  }

  getEnergyProduction(): number {
    // fixit it counts all except buildings - fixit somehow
    return this.assetService.getAssetProductionQtyByName(ResourceName.Energy);
  }

  getEnergyUsage(): number {
    // fixit it counts all except buildings - fixit somehow
    return this.assetService.getAssetConsumptionQtyByName(ResourceName.Energy);
  }
}
