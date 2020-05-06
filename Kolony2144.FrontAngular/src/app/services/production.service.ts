import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { DataProviderService } from './data-provider.service';
import { KolonyService } from './kolony.service';
import { EntityService } from './entity.service';
import { AssetService } from '../assets-module/asset.service';
import { OverviewService } from '../overview-module/overview.service';
import { PowerService } from '../power-module/power.service';
import { TradeService } from '../trade-module/trade.service';
import { IEntity } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private entityService: EntityService,
    private assetService: AssetService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private tradeService: TradeService
  ) {
    // todo move from gameservice
  }



}



