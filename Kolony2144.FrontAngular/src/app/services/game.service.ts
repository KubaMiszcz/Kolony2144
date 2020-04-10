import { SharedService } from './shared.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IKolony, Kolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';
import { CrewNames } from '../models/Crew';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { OverviewService } from './overview.service';
import { AssetService } from './asset.service';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerNotes = '';

  // isTurnComputing = false;
  // AllAssets: IAsset[];

  constructor(
    private router: Router,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private assetService: AssetService,
  ) {
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

      //#ENDREGION
      //##########################################


      {
        this.setNextMonth();
        this.overviewService.clearNews();
      }


      //##########################################
      //#REGION NEW TURN BEGINS
      this.ClearVolatileResources();
      this.updateInventoryDueToMaintenance(this.assetService.getAllAssets());
      this.updateInventoryDueToProducingItems(this.assetService.getAllAssets());


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

      this.updateNews();
      this.router.navigate(['/start']);
    }, 200);
  }

  setNextMonth() {
    console.log('setNextMonth');
    this.kolonyService.setNextMonth();
  }

  updateNews() {
    // this.overviewService.addNews('## Welcome in new month, current time is: ' + this.kolony.Age.toFixed(1)) + ' of New Era';
    // let msg = '';

    // // news about crew
    // msg = '# Your crew (total ' + this.kolonyService.getAllCrewQuantity() + ' persons):'
    // this.overviewService.addNews(msg);

    // // news about food
    // let foodAsset = this.kolonyService.getKolonyAssetByName(ResourceName.Food);
    // let monthlyFoodConsumption = this.kolonyService.getMonthlyAssetConsumptionByName(ResourceName.Food);
    // msg = '* Eats ' + monthlyFoodConsumption + foodAsset.UoM + ' of ' + foodAsset.Name + '. '
    //   + foodAsset.Name + ' is enough for ' + (Math.floor(foodAsset.Quantity / monthlyFoodConsumption)) + ' months';
    // this.overviewService.addNews(msg);

    // // news about salary
    // let cashAsset = this.kolonyService.getKolonyAssetByName(ResourceName.Cash);
    // let monthlyCashConsumption = this.kolonyService.getMonthlyAssetConsumptionByName(ResourceName.Cash);
    // msg = '* Earns ' + monthlyCashConsumption + cashAsset.UoM + ' of ' + cashAsset.Name + '. '
    //   + cashAsset.Name + ' is enough for ' + (Math.floor(cashAsset.Quantity / monthlyCashConsumption)) + ' months';
    // this.overviewService.addNews(msg);

  }

  ClearVolatileResources() {
    this.assetService.getKolonyVolatileAssets().forEach(element => element.Quantity = 0);
  }

  updateInventoryDueToMaintenance(assetList: IAsset[]) {
    assetList.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        assetList.find(a => a.Name == consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToProducingItems(assetList: IAsset[]) {
    assetList.forEach(asset => {
      asset.PassiveIncome.forEach(producedItem => {
        assetList.find(a => a.Name == producedItem.Name).Quantity += (producedItem.Quantity * asset.Quantity);
      });
    });
  }

}


