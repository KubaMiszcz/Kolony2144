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
import { CargoShipNames } from '../models/enums/CargoShipNames.enum';
import { CompanyNames } from '../models/enums/CompanyNames.enum';
import { PlanetNames } from '../models/enums/PlanetNames.enum';



@Injectable({
  providedIn: 'root'
})
export class TradeService {
  tradeAnnouncement = '';
  tradeableCargo: IAsset[] = [];
  isShipLanded: boolean;
  landingProbability = 0.99;
  shipSizeVariation = 0.2;  // future  depend on shipsize?
  priceVariation = 0.2; // future  depend on asset
  landedShip: ICargoShip;


  constructor(
    private sharedService: SharedService,
    private assetService: AssetService,
    private financeService: FinanceService,
  ) { }

  updateResourcesPrices() {
    // !! fixit check if prices too low and variations cant change it
    this.tradeableCargo.forEach(r => {
      r.Price = this.sharedService.getRandomIntAroundValue(r.Price, r.Price * this.priceVariation);
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


  setTradeAnnouncement() {
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


  prepareIncomingShip() {
    this.isShipLanded = this.sharedService.getRandomBoolean();
    this.updateResourcesPrices();

    if (this.isShipLanded) {
      const ship = new Object() as ICargoShip;
      ship.Size = this.getSizeLandedShip(1000); // todo 1000 is cargobays number
      ship.Name = this.sharedService.getRandomValueFromEnum(Object.values(CargoShipNames));
      ship.CompanyName = this.sharedService.getRandomValueFromEnum(Object.values(CompanyNames));
      ship.OriginPlanetName = this.sharedService.getRandomValueFromEnum(Object.values(PlanetNames));
      ship.DestinationPlanetName = this.sharedService.getRandomValueFromEnum(Object.values(PlanetNames));
      ship.Cargo = this.getShipCargo(ship.Size);
      this.landedShip = ship;
      console.log(ship);

    }
  }

  getShipCargo(shipSize: number): IAsset[] {
    this.tradeableCargo.forEach(r => {
      const tradeType = this.sharedService.getRandomIntFromRange(-1, 1);
      if (tradeType === 0) {
        r.Quantity = 0;
      } else {
        r.Quantity = tradeType * this.sharedService.getRandomIntAroundValue(shipSize, shipSize * this.shipSizeVariation);
      }
    });

    return this.tradeableCargo.filter(r => r.Quantity !== 0);
  }

  getSizeLandedShip(cargoBaysQty: number): number {
    return this.sharedService.getRandomIntAroundValue(cargoBaysQty, cargoBaysQty * this.shipSizeVariation);
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
