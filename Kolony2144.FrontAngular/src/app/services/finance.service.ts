import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from './asset.service';
import { ResourceName } from '../models/Resource';
import { CrewService } from './crew.service';
import { GameService } from './game.service';
import { KolonyService } from './kolony.service';
import { OverviewService } from './overview.service';
import { PowerService } from './power.service';
import { SharedService } from './shared.service';
import { TradeService } from './trade.service';
import { WikiService } from './wiki.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  cash: IAsset;
  get Cash() { return this.cash; };
  set Cash(value) { this.cash = value; this.CashBS.next(value) };
  CashBS = new Subject<IAsset>();

  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
  ) {
    this.Cash = this.assetService.getAssetByName(ResourceName.Cash);
  }

  emitCurrentCash() {
    this.CashBS.next(this.cash);
  }
}
