import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from '../assets-module/asset.service';
import { ResourceName } from '../models/Resource';
import { CrewService } from '../crew-module/crew.service';
import { GameService } from './game.service';
import { KolonyService } from './kolony.service';
import { CommonService } from './common.service';
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
    private commonService: CommonService,
    private assetService: AssetService,
  ) {
    this.Cash = this.assetService.getAssetByName(ResourceName.Cash);
  }

}
