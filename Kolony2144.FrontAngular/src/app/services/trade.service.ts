import { SpaceCargoShipNames } from './../models/enums/SpaceCargoShipNames.enum';
import { BuildingNames } from './../models/Building';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { Router } from '@angular/router';
import { SharedService } from './shared.service';
import { CompanyNames } from '../models/enums/CompanyNames.enum';
import { PlanetNames } from '../models/enums/PlanetNames.enum';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  kolony: IKolony;
  tradeAnnouncement: ITradeAnnouncement;
  landingProbability: number = 0.8;
  shipSizeModifier: number = 0.2;


  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  setTradeAnnouncement() {
    // let cargoBaysQty = this.kolony.Buildings.find(b => b.Name === BuildingNames.CargoBay.valueOf()).StockQuantity;
    // let shipSize = this.getSizeLandedShip(cargoBaysQty, this.landingProbability);

    // if (shipSize > 0) {
    //   let announcement = new TradeAnnouncement();
    //   announcement.shipSize = shipSize;
    //   announcement.shipName = this.sharedService.getRandomValueFromEnum(Object.values(SpaceCargoShipNames));
    //   announcement.companyName = this.sharedService.getRandomValueFromEnum(Object.values(CompanyNames));
    //   announcement.originPlanetName = this.sharedService.getRandomValueFromEnum(Object.values(PlanetNames));
    //   announcement.destinationPlanetName = this.sharedService.getRandomValueFromEnum(Object.values(PlanetNames));
    //   this.tradeAnnouncement = announcement;
    //   console.log('fromservice', announcement);
    //   return announcement;
    // }
  }

  getSizeLandedShip(cargoBaysQty: number, landingProbability: number): number {
    let size = 0;
    let isLanded = Math.round(Math.random());
    if (isLanded < landingProbability) {
      let minShip = 1 - this.shipSizeModifier;
      let maxShip = 1 + this.shipSizeModifier;
      let factor = this.sharedService.getRandomFromRange(minShip, maxShip);
      size = Math.round(cargoBaysQty * factor);
    }
    return size;
  }
}

export interface ITradeAnnouncement {
  shipSize: number;
  shipName: string;
  companyName: string;
  originPlanetName: string;
  destinationPlanetName: string;
}

export class TradeAnnouncement implements ITradeAnnouncement {
  shipSize: number;
  shipName: string;
  companyName: string;
  originPlanetName: string;
  destinationPlanetName: string;
}
