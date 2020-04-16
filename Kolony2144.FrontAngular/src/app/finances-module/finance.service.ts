import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from '../assets-module/asset.service';
import { ResourceName } from '../models/Resource';
import { GameService } from '../services/game.service';
import { KolonyService } from '../services/kolony.service';
import { OverviewService } from '../overview-module/overview.service';
import { SharedService } from '../services/shared.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private cash: IAsset;
  get Cash() { return this.cash; }
  set Cash(value: IAsset) { this.cash = value; this.CashBS.next(value); }
  CashBS = new BehaviorSubject<IAsset>(null);

  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
  ) {
    this.Cash = this.assetService.getAssetByName(ResourceName.Cash);
  }

}
