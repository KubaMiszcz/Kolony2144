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
import { AllBuildings, IBuilding, Building } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { SharedService } from './shared.service';
import { WikiService } from './wiki.service';
import { AssetTypesEnum, GenericTypesEnum } from '../models/enums/Types.enum';
import { IKolony } from '../models/Kolony';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private age = 100;
  get Age(): number { return Math.round(this.age * 10) / 10; }
  set Age(value: number) { this.age = value; this.AgeBS.next(value); }
  AgeBS = new BehaviorSubject<number>(100);

  private playerNotes = '';
  get PlayerNotes() { return this.playerNotes; }
  set PlayerNotes(value: string) { this.playerNotes = value; this.PlayerNotesBS.next(value); }
  PlayerNotesBS = new BehaviorSubject<string>('');

  ALL_ASSETS_LIST: IAsset[] = [];
  ALL_BUILDINGS_LIST: IBuilding[] = [];

  // isTurnComputing = false;

  constructor(
    private router: Router,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
    private assetService: AssetService,
    private crewService: CrewService,
    private financeService: FinanceService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private tradeService: TradeService,
    private wikiService: WikiService,
  ) {
    this.playerNotes = sessionStorage.getItem('savedState');
    this.ALL_ASSETS_LIST = this.getAllInitialGameAssets();
    this.ALL_BUILDINGS_LIST = this.getAllInitialGameBuildings();
    this.tradeService.tradeableCargo = this.getTradeableAssets();
    this.nextTurn();
  }

  getAllInitialGameAssets(): IAsset[] {
    const res = [];
    [...AllResources, ...AllCivilianCrew, ...AllMachines].forEach(i => {
      res.push(new Asset().Deserialize(i));
    });

    return res;
  }

  getAllInitialGameBuildings(): IBuilding[] {
    const res = [];
    [...AllBuildings].forEach(i => {
      res.push(new Building().Deserialize(i));
    });

    return res;
  }

  getAssetByName(name: string): IAsset {
    return this.ALL_ASSETS_LIST.find(i => i.Name === name);
  }


  nextTurn() {
    console.log('nexturn');
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {

      // ##########################################
      // #region TURN ENDS
      // update inventory after production

      // update production queue, and assets array
      // this.productionService.produceAssetsInQueue(production);

      // update construction queue, and assets array
      // this.productionService.produceAssetsInQueue();

      // #ENDREGION
      // ##########################################


      {
        console.log('newMonthBegins');
        this.Age += 0.1;
        this.overviewService.clearNews();
      }


      // ##########################################
      // #REGION NEW TURN BEGINS
      this.assetService.ClearVolatileResources();
      this.assetService.updateInventoryDueToMaintenance();
      // todo MINING       // this.MiningService.mining
      this.assetService.updateInventoryDueToPassiveProducedItems();

      this.tradeService.prepareIncomingShip();
      this.tradeService.setTradeAnnouncement();


      //   //UPDATE powerstatus with newly produced assets
      //   this.powerService.updatePowerStatus();

      // ##########################################


      // this.tradeService.setTradeAnnouncement(); console.log('setTradeAnnouncement');
      // this.kolonyService.setTradeAnnouncement();
      // this.isTurnComputing.next(false);

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

    // news about ship
    this.overviewService.addNews(this.tradeService.tradeAnnouncement);


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
      msg = '!!! ' + (((consumption / production) * 100) - 100).toFixed(1) + '%  OVERLOADED !!!';
      this.overviewService.addNews(msg);
    }
    // Your kolony Energy usage 6200kW is 120 % of total production 6000kW
    msg = 'Your kolony ' + resource.Name + ' usage ' + consumption + resource.UoM
      + ' (' + ((consumption / production) * 100).toFixed(1) + '%) of total ' + production + resource.UoM;
    this.overviewService.addNews(msg);

  }




  getTradeableAssets(): IAsset[] {
    const list = this.sharedService.cloneObject<IAsset[]>(this.ALL_ASSETS_LIST);

    return list.filter(a => a.Tags.includes(GenericTypesEnum.Tradeable));
  }

  saveGame() {
    let gameState = new Object() as IGameState;
    gameState = {
      Age: this.age,
      playerNotes: this.playerNotes,
      kolony: this.kolonyService.getKolonyState()
    };
    localStorage.setItem('savedGameState', JSON.stringify(gameState));
  }

  loadGame() {
    const gameState: IGameState = JSON.parse(localStorage.getItem('savedGameState'));
    this.Age = gameState.Age;
    this.PlayerNotes = gameState.playerNotes;
    // this.kolonyService.setKolonyState(gameState.kolony);
  }

}

interface IGameState {
  Age: number;
  playerNotes: string;
  kolony: IKolony;
}


