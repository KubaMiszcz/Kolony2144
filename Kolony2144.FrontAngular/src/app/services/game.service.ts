import { SharedService } from './shared.service';
import { NewsService } from './news.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { InventoryItemsNames } from '../models/InventoryItem';
import { CrewNames } from '../models/Crew';
import { TypesEnum } from '../models/enums/Types.enum';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  kolony: IKolony;
  playerNotes = '';

  // isTurnComputing = false;
  // AllAssets: IAsset[];

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
    private newsService: NewsService,
  ) {
    this.kolony = this.kolonyService.kolony;
    // this.AllAssets = JSON.parse(JSON.stringify([...StarterCivilianCrew, ...StarterMachines, ...StarterBuildings]));
    // this.AllAssets.forEach(a => a.Quantity = 0);
    // this.AllInventoryItems = JSON.parse(JSON.stringify([...StarterInventoryItems]));
    // this.AllInventoryItems.forEach(a => a.Quantity = 0);

    // this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
    this.nextTurn();
  }




  nextTurn() {
    console.log('nexturn');

    this.router.navigate(['/loading-screen']);
    setTimeout(() => {


      //##########################################
      //#region TURN ENDS
      //update inventory after production




      //update production queue, and assets array
      // this.productionService.produceAssetsInQueue(production);

      //update construction queue, and assets array
      // this.productionService.produceAssetsInQueue();
      let previousTurnFoodQty = this.kolonyService.getKolonyAssetByName(InventoryItemsNames.Food).Quantity;


      //#ENDREGION
      //##########################################


      {
        this.setNextMonth(); console.log('setNextMonth');
        this.newsService.clearNews();
      }


      //##########################################
      //#REGION NEW TURN BEGINS

      this.kolonyService.updateInventoryDueToConsumingItems();
      this.kolonyService.updateInventoryDueToProducingItems();









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


      //update news
      this.newsService.addNews('## Welcome in new month, current time is: ' + this.kolony.Age.toFixed(1)) + ' of New Era';
      let msg = '';



      // news about crew
      msg = '# Your crew (total ' + this.kolonyService.getAllCrewQuantity() + ' persons):'
      this.newsService.addNews(msg);

      // news about food
      let foodAsset = this.kolonyService.getKolonyAssetByName(InventoryItemsNames.Food);
      let monthlyFoodConsumption = this.kolonyService.getMonthlyAssetConsumptionByName(InventoryItemsNames.Food);
      msg = '* Eats ' + monthlyFoodConsumption + foodAsset.UoM + ' of ' + foodAsset.Name + '. '
        + foodAsset.Name + ' is enough for ' + (Math.floor(foodAsset.Quantity / monthlyFoodConsumption)) + ' months';
      this.newsService.addNews(msg);

      // news about salary
      let cashAsset = this.kolonyService.getKolonyAssetByName(InventoryItemsNames.Cash);
      let monthlyCashConsumption = this.kolonyService.getMonthlyAssetConsumptionByName(InventoryItemsNames.Cash);
      msg = '* Earns ' + monthlyCashConsumption + cashAsset.UoM + ' of ' + cashAsset.Name + '. '
        + cashAsset.Name + ' is enough for ' + (Math.floor(cashAsset.Quantity / monthlyCashConsumption)) + ' months';
      this.newsService.addNews(msg);





      console.log();

      this.router.navigate(['/start']);
    }, 200);
  }

  setNextMonth() {
    this.kolony.Age += 0.1;
  }

}


