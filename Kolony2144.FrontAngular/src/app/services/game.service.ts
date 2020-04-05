import { IInventoryItem } from 'src/app/models/Entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { Router } from '@angular/router';
import { TradeService } from './trade.service';
import { ProcessingPhasesNames } from '../models/enums/Types.enum';
import { IAsset } from '../models/Entity';
import { StarterCivilianCrew } from '../models/Crew';
import { StarterMachines } from '../models/Machine';
import { StarterBuildings } from '../models/Building';
import { StarterInventoryItems } from '../models/InventoryItem';
import { PowerService } from './power.service';
import { ProductionService } from './production.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameNotes = '';// = new BehaviorSubject<string>('');
  isTurnComputing = new BehaviorSubject<boolean>(false);
  kolony: IKolony;
  AllAssets: IAsset[];
  AllInventoryItems: IInventoryItem[];

  constructor(
    private router: Router,
    private kolonyService: KolonyService,
    private productionService: ProductionService,
    private powerService: PowerService,
    private tradeService: TradeService
  ) {
    this.AllAssets = JSON.parse(JSON.stringify([...StarterCivilianCrew, ...StarterMachines, ...StarterBuildings]));
    this.AllAssets.forEach(a => a.Quantity = 0);
    this.AllInventoryItems = JSON.parse(JSON.stringify([...StarterInventoryItems]));
    this.AllInventoryItems.forEach(a => a.Quantity = 0);

    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
    this.nextTurn();
  }

  nextTurn() {
    let phase;

    console.log('nextTurn');
    this.isTurnComputing.next(true);
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {
      //##########################################
      //#region TURN ENDS

      //update production queue, and assets array
      // this.productionService.produceAssetsInQueue(production);

      //update construction queue, and assets array
      this.productionService.produceAssetsInQueue();

      //#ENDREGION
      //##########################################



      this.setNextMonth(); console.log('setNextMonth');



      //##########################################
      //#REGION NEW TURN BEGINS

      //zeroingVolatileProperties
      this.kolonyService.zeroingVolatileProperties(this.kolony.AllInventoryItemsArray);

      //PRODUCE inventory items, power status and work hours
      phase = ProcessingPhasesNames.Production;
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerSources, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerFacilities, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Crew, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Machines, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Buildings, phase);

      //MINING
      //this.MiningService.mining

      //CONSUMING inventory items
      phase = ProcessingPhasesNames.Consuming;
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Crew, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Machines, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerSources, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Buildings, phase);
      this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerFacilities, phase);

      //UPDATE powerstatus with newly produced assets
      this.powerService.updatePowerStatus();

      //#ENDREGION
      //##########################################


      // this.tradeService.setTradeAnnouncement(); console.log('setTradeAnnouncement');
      //   this.kolonyService.setTradeAnnouncement();
      //   this.isTurnComputing.next(false);
      this.router.navigate(['/start']);
    }, 100);
  }

  setNextMonth() {
    this.kolony.Age += 0.1;
  }

  setPlayerNotes(value) {
    // this.gameNotes.next(value);
  }

  SaveGame() {
    sessionStorage.setItem('kolony', JSON.stringify(this.kolonyService.KolonyBS.value));
  }



}


