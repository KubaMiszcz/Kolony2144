import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AssetService } from '../assets-module/asset.service';
import { OverviewService } from '../overview-module/overview.service';
import { PowerService } from '../power-module/power.service';
import { TradeService } from '../trade-module/trade.service';
import { CommonService } from './common.service';
import { DataProviderService } from './data-provider.service';
import { EntityService } from './entity.service';
import { KolonyService } from './kolony.service';
import { SharedService } from './shared.service';
import { IEntity } from '../models/Entity';
import { ResourceName } from '../models/Resource';
import { IKolony } from '../models/Kolony';
import { EntityTypesEnum } from '../models/enums/Types.enum';


@Injectable({
  providedIn: 'root'
})
export class GameService {
  kolony: IKolony;

  constructor(
    private router: Router,
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private entityService: EntityService,
    private assetService: AssetService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private tradeService: TradeService
  ) {
    this.kolony = kolonyService.Kolony;
    this.assetService.ClearVolatileAssets();
    this.overviewService.PassiveProductionReport = this.entityService.UpdateInventoryDueToPassiveProducedItems();
    this.entityService.getEntityByName(ResourceName.PlanetSpace).Quantity = 1000000;
  }






  nextTurn() {
    console.log('nexturn');
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {
      // MAINTENANCE
      this.overviewService.MaintenanceReport = this.entityService.UpdateInventoryDueToMaintenanceCost(this.entityService.allKolonyEntitiesList);

      this.kolonyService.Kolony.Age += 0.1;
      console.log('newMonthBegins: ', this.kolonyService.Kolony.Age);
      this.overviewService.clearNews();
      this.assetService.ClearVolatileAssets();

      // !!! fixit d
      this.entityService.getEntityByName(ResourceName.PlanetSpace).Quantity = 1000000;

      // Passive income
      // fix split into buidings crew machines etc
      this.overviewService.PassiveProductionReport = this.entityService.UpdateInventoryDueToPassiveProducedItems();


      // MINING
      // todo MINING       // this.MiningService.mining



      // CONSTRUCTION
      this.overviewService.ConstructionReport = this.proceedQueue(this.entityService.constructionQueue);


      // PRODUCTION MACHINES
      // todo production
      this.overviewService.ProductionReport = this.proceedQueue(this.entityService.productionQueue);


      // TRADE news
      this.tradeService.PrepareIncomingShip();


      this.overviewService.UpdateNews();
      this.router.navigate(['/start']);
    }, 200);
  }




  proceedQueue(queue: IEntity[]): string[] {
    const report = [];
    for (const constructedItem of queue) {
      // const maxCount = this.entityService.getPossibleConstructionQty(constructedItem);
      const maxCounts = this.entityService.getPossibleConstructionQties(constructedItem);

      if (maxCounts.some(e => e.qty <= 0)) {
        const missedResources = maxCounts.filter(e => e.qty <= 0).map(e => e.name);
        report.push('budowa wstrzymana, zabraklo surowcow do budowy: ' + missedResources);
        break;
      }

      const countToAdd = maxCounts.reduce((acc, e) => acc.qty <= e.qty ? acc : e).qty;

      this.entityService.updateInventoryDueToProduceEntity(constructedItem, countToAdd);
      this.kolonyService.updateGenericLists();

      const nextQty = constructedItem.Quantity - countToAdd;
      const itemToAdd = Math.floor(Math.ceil(constructedItem.Quantity) - nextQty);
      constructedItem.Quantity = nextQty;

      if (itemToAdd > 0) {
        let itemInKolony = this.entityService.getEntityByName(constructedItem.Name);
        if (!itemInKolony) {
          itemInKolony = this.kolonyService.createNewEntityInKolony(constructedItem);
        }
        itemInKolony.Quantity += itemToAdd;
        report.push('ukonczono ' + itemToAdd + 'pcs of ' + constructedItem.Name);
      }

      if (constructedItem.Quantity <= 0) {
        report.push('zakonczono budowe ' + constructedItem.Name);
      } else {
        const remainPcs = Math.ceil(constructedItem.Quantity);
        const currentProgress = remainPcs - constructedItem.Quantity;
        const currentProgressPercentage = this.commonService.ConvertToPercents(currentProgress / remainPcs, 1);
        report.push('ukonczono ' + currentProgressPercentage + '% z pozstaloych ' + remainPcs + 'pcs of ' + constructedItem.Name);
        break; // stop proceeding queue (maybe is it cool if we can build next possible builidngs in queue?)
      }
    }

    // info dont do this earlier due to not change iterable list
    queue = queue.filter(e => e.Quantity > 0);

    return report;
  }




















  saveGame() {
    // let gameState = new Object() as IGameState;
    // gameState = {
    //   Age: this.age,
    //   playerNotes: this.dataProviderService.playerNotes,
    //   kolony: this.kolonyService.getKolonyState()
    // };
    // localStorage.setItem('savedGameState', JSON.stringify(gameState));
  }

  loadGame() {
    // const gameState: IGameState = JSON.parse(localStorage.getItem('savedGameState'));
    // this.Age = gameState.Age;
    // this.dataProviderService.fillDataFromSavedState();
    // this.PlayerNotesDEPR = gameState.playerNotes;
    // this.kolonyService.setKolonyState(gameState.kolony);
  }

  savePlayerNotes(value: string) {
    this.dataProviderService.PlayerNotes = value;
    localStorage.setItem('playerNotes', JSON.stringify(value));
  }


  loadPlayerNotes(): string {
    const value: string = JSON.parse(localStorage.getItem('playerNotes'));
    this.dataProviderService.PlayerNotes = value;

    return value;
  }

}



