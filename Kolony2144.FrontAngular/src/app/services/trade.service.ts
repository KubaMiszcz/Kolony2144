import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { AssetService } from './asset.service';
import { AssetTypesEnum, ResourceTypesEnum, GenericTypesEnum } from '../models/enums/Types.enum';
import { IAsset } from '../models/Entity';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { GameService } from './game.service';
import { KolonyService } from './kolony.service';
import { OverviewService } from './overview.service';
import { PowerService } from './power.service';
import { WikiService } from './wiki.service';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeableResources: IAsset[];
  isShipIncoming: boolean;
  shipVariationPercent: number = 20;
  priceVariationPercent: number = 20;

  prepareIncomingShip() {
    this.isShipIncoming = this.sharedService.getRandomBoolean();
    this.updateResourcesPrices();
  }

  updateResourcesPrices() {
    let shipSize: number = 100;
    this.tradeableResources.forEach(r => {
      let isResourceOnCurrentShip = this.sharedService.getRandomBoolean();
      if (isResourceOnCurrentShip) {
        r.Quantity = shipSize * this.sharedService.getRandomFromRange(100 - this.shipVariationPercent, 100 + this.shipVariationPercent) / 100;
      } else {
        r.Quantity = 0;
      }
      //!! todo check if prices too low and variations cant change it
      r.Price = r.Price * this.sharedService.getRandomFromRange(100 - this.priceVariationPercent, 100 + this.priceVariationPercent) / 100;
    });
  }






  constructor(
    private AssetService: AssetService,
    private crewService: CrewService,
    private financeService: FinanceService,
    private gameService: GameService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private sharedService: SharedService,
    private wikiService: WikiService,
  ) {
    // this.tradeableResources = assetService.getAllResources().filter(r => r.Tags.includes(GenericTypesEnum.Tradeable));
    this.tradeableResources = this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Resource && a.SubType === ResourceTypesEnum.Production);
  }

  getTradeableCrew(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Crew);
  }

  getTradeableMachines(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Machine);
  }
}
