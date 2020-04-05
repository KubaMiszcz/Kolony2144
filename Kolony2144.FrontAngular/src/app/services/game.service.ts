import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { IKolony } from '../models/Kolony';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  // gameNotes = '';
  // isTurnComputing = false;
  kolony: IKolony;
  // AllAssets: IAsset[];

  constructor(
    private router: Router,
    // private kolonyService: KolonyService,
  ) {
    // this.AllAssets = JSON.parse(JSON.stringify([...StarterCivilianCrew, ...StarterMachines, ...StarterBuildings]));
    // this.AllAssets.forEach(a => a.Quantity = 0);
    // this.AllInventoryItems = JSON.parse(JSON.stringify([...StarterInventoryItems]));
    // this.AllInventoryItems.forEach(a => a.Quantity = 0);

    // this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
    // this.nextTurn();
  }



  nextTurn() {
    console.log('nexturn');

    // this.isTurnComputing.next(true);
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {
      //   //##########################################
      //   //#region TURN ENDS

      //   //update production queue, and assets array
      //   // this.productionService.produceAssetsInQueue(production);

      //   //update construction queue, and assets array
      //   this.productionService.produceAssetsInQueue();

      //   //#ENDREGION
      //   //##########################################



      //   this.setNextMonth(); console.log('setNextMonth');



      //   //##########################################
      //   //#REGION NEW TURN BEGINS

      //   //zeroingVolatileProperties
      //   this.kolonyService.zeroingVolatileProperties(this.kolony.AllInventoryItemsArray);

      //   //PRODUCE inventory items, power status and work hours
      //   phase = ProcessingPhasesNames.Production;
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerSources, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerFacilities, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Crew, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Machines, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Buildings, phase);

      //   //MINING
      //   //this.MiningService.mining

      //   //CONSUMING inventory items
      //   phase = ProcessingPhasesNames.Consuming;
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Crew, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Machines, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerSources, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.Buildings, phase);
      //   this.kolonyService.updateStockQuantityForAssetsList(this.kolony.PowerFacilities, phase);

      //   //UPDATE powerstatus with newly produced assets
      //   this.powerService.updatePowerStatus();

      //   //#ENDREGION
      //   //##########################################


      //   // this.tradeService.setTradeAnnouncement(); console.log('setTradeAnnouncement');
      //   //   this.kolonyService.setTradeAnnouncement();
      //   //   this.isTurnComputing.next(false);
      this.router.navigate(['/start']);
    }, 100000);
  }

  setNextMonth() {
    this.kolony.Age += 0.1;
  }

}


