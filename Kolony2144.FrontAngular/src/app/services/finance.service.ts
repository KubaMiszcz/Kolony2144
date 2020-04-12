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

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private cash: IAsset;

  constructor(
    private assetService: AssetService,
    private crewService: CrewService,
    private gameService: GameService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private sharedService: SharedService,
    private tradeService: TradeService,
    private wikiService: WikiService,
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
