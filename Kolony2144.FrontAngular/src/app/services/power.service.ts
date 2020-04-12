import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { ResourceName } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { GameService } from './game.service';
import { KolonyService } from './kolony.service';
import { OverviewService } from './overview.service';
import { SharedService } from './shared.service';
import { TradeService } from './trade.service';
import { WikiService } from './wiki.service';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private powerAssets: IAsset[] = [];

  constructor(
    private sharedService: SharedService,
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
