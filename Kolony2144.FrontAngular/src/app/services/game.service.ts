import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';
import { OverviewService } from './overview.service';
import { AssetService } from './asset.service';
import { IAsset } from '../models/Entity';
import { PowerService } from './power.service';
import { TradeService } from './trade.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerNotes = '';
  private age = 100;
  get Age(): number { return Math.round(this.age * 10) / 10; }
  set Age(value: number) { this.age += 0.1; }

  // isTurnComputing = false;
  // AllAssets: IAsset[];

  constructor(
    private router: Router,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private assetService: AssetService,
    private powerService: PowerService,
    private tradeService: TradeService,
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
        console.log('newMonthBegins');
        this.Age += 0.1;
        this.overviewService.clearNews();
      }


      //##########################################
      //#REGION NEW TURN BEGINS
      this.ClearVolatileResources();
      this.updateInventoryDueToMaintenance(this.assetService.getAllAssets());
      this.updateInventoryDueToProducingItems(this.assetService.getAllAssets());

      this.tradeService.prepareIncomingShip();
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

  updateNews() {
    let resource: IAsset;
    let consumption;
    let production;
    let msg;
    this.overviewService.addNews('Welcome in new month, current time is: ' + this.Age + ' of New Era');
    this.overviewService.addNews('');

    // news about cash
    resource = this.assetService.getAssetByName(ResourceName.Cash);
    consumption = this.assetService.getAssetConsumptionQty(resource);
    if (resource.Quantity < 0) {
      this.overviewService.addNews('!!! CASH RUNS OUT, BAILIFF IS COMING TO KOLONY !!!');
    }
    msg = 'Last month expenses: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.overviewService.addNews(msg);

    // news about food
    resource = this.assetService.getAssetByName(ResourceName.Food);
    consumption = this.assetService.getAssetConsumptionQty(resource);
    if (resource.Quantity < 0) {
      this.overviewService.addNews('!!! HUNGER IN KOLONY !!!');
    }
    msg = 'Your Crew last month ate: ' + consumption + resource.UoM
      + ', ' + resource.Name + ' is enough for ' + (Math.floor(resource.Quantity / consumption)) + ' months';
    this.overviewService.addNews(msg);

    // news about power
    resource = this.assetService.getAssetByName(ResourceName.Energy);
    consumption = this.powerService.getEnergyUsage();
    production = this.powerService.getEnergyProduction();
    if (consumption > production) {
      msg = '!!! ' + (((consumption / production) * 100) - 100).toFixed(1) + '%  OVERLOADED !!!'
      this.overviewService.addNews(msg);
    }
    // Your kolony Energy usage 6200kW is 120 % of total production 6000kW
    msg = 'Your kolony ' + resource.Name + ' usage ' + consumption + resource.UoM
      + ' (' + ((consumption / production) * 100).toFixed(1) + '%) of total ' + production + resource.UoM;
    this.overviewService.addNews(msg);

  }

  ClearVolatileResources() {
    this.assetService.getVolatileAssets().forEach(element => element.Quantity = 0);
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


