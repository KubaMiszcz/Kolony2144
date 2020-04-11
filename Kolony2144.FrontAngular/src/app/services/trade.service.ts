import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { AssetTypesEnum, ResourceTypesEnum } from '../models/enums/Types.enum';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class TradeService {

  constructor(
    private assetService: AssetService,
  ) { }

  getTradeableCrew(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Crew);
  }

  getTradeableResources(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Resource && a.SubType === ResourceTypesEnum.Production);
  }

  getTradeableMachines(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Machine);
  }
}
