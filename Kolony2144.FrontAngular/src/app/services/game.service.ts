import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KolonyService } from './kolony.service';
import { ResourceName, AllResources } from '../models/Resource';
import { OverviewService } from './overview.service';
import { AssetService } from './asset.service';
import { IAsset, Asset } from '../models/Entity';
import { PowerService } from './power.service';
import { TradeService } from './trade.service';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { SharedService } from './shared.service';
import { WikiService } from './wiki.service';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  playerNotes = '';
  private age = 100;
  get Age(): number { return Math.round(this.age * 10) / 10; }
  set Age(value: number) { this.age += 0.1; }
  ALL_ASSETS_LIST: IAsset[];


  // isTurnComputing = false;
  // AllAssets: IAsset[];

  constructor(
    private router: Router,
    private assetService: AssetService,
    private crewService: CrewService,
    private financeService: FinanceService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private sharedService: SharedService,
    private tradeService: TradeService,
    private wikiService: WikiService,
  ) {
    this.nextTurn();
    this.ALL_ASSETS_LIST = this.getAllInitialGameAssets()
  }

  getAllInitialGameAssets(): IAsset[] {
    let res = [];
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines]
      .forEach(i => {
        res.push(new Asset().Deserialize(i));
      });
    return
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
      this.assetService.ClearVolatileResources();
      this.assetService.updateInventoryDueToMaintenance();
      this.assetService.updateInventoryDueToProducingItems();

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







}


