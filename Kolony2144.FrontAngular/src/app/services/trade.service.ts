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

export enum TransactionTypeEnum {
  Buy,
  Sell
}


@Injectable({
  providedIn: 'root'
})
export class TradeService {

  tradeableResources: IAsset[] = [];
  isShipIncoming: boolean;
  shipVariationPercent = 20;  // future  depend on shipsize?
  priceVariationPercent = 20; // future  depend on asset


  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
    private financeService: FinanceService,
  ) {

  }

  getTradeableCrew(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Crew);
  }

  getTradeableMachines(): IAsset[] {
    return this.assetService.getNonVolatileAssets().filter(a => a.Type === AssetTypesEnum.Machine);
  }

  prepareIncomingShip() {
    this.isShipIncoming = this.sharedService.getRandomBoolean();
    this.updateResourcesPrices();
  }

  updateResourcesPrices() {
    const shipSize = 1000;
    this.tradeableResources.forEach(r => {
      const tradeType = this.sharedService.getRandomFromRange(-1, 1);
      if (tradeType === 0) {
        r.Quantity = 0;
      } else {
        r.Quantity = tradeType * shipSize
          * this.sharedService.getRandomFromRange(100 - this.shipVariationPercent, 100 + this.shipVariationPercent) / 100;
      }
      // !! fixit check if prices too low and variations cant change it
      r.Price = Math.round(
        r.Price * this.sharedService.getRandomFromRange(100 - this.priceVariationPercent, 100 + this.priceVariationPercent) / 100
      );
    });
  }


  proceedTransaction(type: TransactionTypeEnum, asset: IAsset, qtyOnTable: number, price: number) {
    this.financeService.Cash.Quantity -= (qtyOnTable * price);
    if (type === TransactionTypeEnum.Buy) {
      asset.Price = this.getUpdatedAVGPrice(asset.Quantity, asset.Price, qtyOnTable, price);
    }
    asset.Quantity += qtyOnTable;
    if (asset.Quantity === 0) {
      asset.Price = 0;
    }
  }

  getUpdatedAVGPrice(curentQty: number, currentPrice: number, addedQty: number, addedPrice: number) {
    const oldValue = curentQty * currentPrice;
    const newValue = oldValue + (addedQty * addedPrice);
    const newQty = curentQty + addedQty;
    const newAVGPrice = newQty === 0 ? 0 : newValue / newQty;
    return this.sharedService.Round(newAVGPrice, 1);
  }

}


