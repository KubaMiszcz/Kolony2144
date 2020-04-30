import { Injectable } from '@angular/core';
import { AssetService } from '../assets-module/asset.service';
import { FinanceService } from '../finances-module/finance.service';
import { IAsset } from '../models/Entity';
import { CargoShipNames } from '../models/enums/CargoShipNames.enum';
import { CompanyNames } from '../models/enums/CompanyNames.enum';
import { PlanetNames } from '../models/enums/PlanetNames.enum';
import { CommonService } from '../services/common.service';
import { DataProviderService } from '../services/data-provider.service';
import { SharedService } from '../services/shared.service';
import { ITradeableEntity } from './../models/Entity';


@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeAnnouncement = '';
  tradeableCargo: ITradeableEntity[] = [];
  isShipLanded: boolean;
  landingProbability = 0.99;
  shipSizeVariation = 0.2;
  priceVariation = 0.2; // futuredepend on asset
  landedShip: ICargoShip;


  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private assetService: AssetService,
    private financeService: FinanceService,
  ) {
    this.tradeableCargo = dataProviderService.ALL_TRADEABLE_ASSETS_LIST;
    this.updateResourcesPrices();
  }

  updateResourcesPrices() {
    // !! fixit check if prices too low and variations cant change it
    this.tradeableCargo.forEach(r => {
      r.Price = this.commonService.getRandomIntAroundValue(r.Price, r.Price * this.priceVariation);
    });
  }



  proceedTransaction(type: TransactionTypeEnum, asset: IAsset, qtyOnTable: number, price: number) {
    if (type === TransactionTypeEnum.Buy) {
      this.financeService.Cash.Quantity -= (qtyOnTable * price);
      asset.Quantity += qtyOnTable;
      asset.Price = this.getUpdatedAVGPrice(asset.Quantity, asset.Price, qtyOnTable, price);
    } else {
      this.financeService.Cash.Quantity += (qtyOnTable * price);
      asset.Quantity -= qtyOnTable;
    }
  }

  getUpdatedAVGPrice(curentQty: number, currentPrice: number, addedQty: number, addedPrice: number) {
    const oldValue = curentQty * currentPrice;
    const newValue = oldValue + (addedQty * addedPrice);
    const newQty = curentQty + addedQty;
    const newAVGPrice = newQty === 0 ? 0 : newValue / newQty;

    return this.commonService.Round(newAVGPrice, 1);
  }


  SetTradeAnnouncement() {
    if (this.isShipLanded) {
      const ship = this.landedShip;
      // Cargo Ship 'VARG-1230' owned by companyName on route from originPlanetName to destinationPlanetName is landed.
      this.tradeAnnouncement = 'Cargo Ship \'' + ship.Name + '-' + ship.Size
        + '\' owned by company \'' + ship.CompanyName
        + '\' on route from planet \'' + ship.OriginPlanetName
        + '\' to \'' + ship.DestinationPlanetName + '\' is landed.';
    } else {
      this.tradeAnnouncement = 'There is no Space Cargo Ship landed.';
    }
  }


  PrepareIncomingShip() {
    this.isShipLanded = this.commonService.getRandomBoolean(this.landingProbability);
    this.updateResourcesPrices();

    if (this.isShipLanded) {
      const ship = new Object() as ICargoShip;
      ship.Size = this.getSizeLandedShip(1000); // todo 1000 is cargobays number
      ship.Name = this.commonService.getRandomValueFromEnum(Object.values(CargoShipNames));
      ship.CompanyName = this.commonService.getRandomValueFromEnum(Object.values(CompanyNames));
      ship.OriginPlanetName = this.commonService.getRandomValueFromEnum(Object.values(PlanetNames));
      ship.DestinationPlanetName = this.commonService.getRandomValueFromEnum(Object.values(PlanetNames));
      ship.Cargo = this.generateShipCargo(ship.Size);
      this.landedShip = ship;
    }
  }

  private generateShipCargo(shipSize: number): IAsset[] {
    this.tradeableCargo.forEach(r => {
      const tradeType = this.commonService.getRandomIntFromRange(-1, 1);
      if (tradeType === 0) {
        r.Quantity = 0;
      } else {
        const qty = this.commonService.getRandomIntAroundValue(shipSize, shipSize * this.shipSizeVariation) * (1 - r.RarityFactor);
        r.Quantity = tradeType * Math.round(qty);
      }
    });

    return this.tradeableCargo.filter(r => r.Quantity !== 0);
  }

  getSizeLandedShip(cargoBaysQty: number): number {
    return this.commonService.getRandomIntAroundValue(cargoBaysQty, cargoBaysQty * this.shipSizeVariation);
  }



}

export interface ICargoShip {
  Size: number;
  Name: string;
  CompanyName: string;
  OriginPlanetName: string;
  DestinationPlanetName: string;
  Cargo: IAsset[];
}

export enum TransactionTypeEnum {
  Buy,
  Sell
}
