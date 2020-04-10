import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from './asset.service';
import { ResourceName } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private cash: IAsset;

  constructor(
    private assetService: AssetService,
  ) {
    this.cash = this.assetService.getAssetByName(ResourceName.Cash);
  }

  getCashQuantity(): number {
    return this.getCash().Quantity;
  }
  getCash(): IAsset {
    return this.cash;
  }

}
