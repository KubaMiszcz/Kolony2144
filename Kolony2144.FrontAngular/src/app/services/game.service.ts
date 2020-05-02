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


@Injectable({
  providedIn: 'root'
})
export class GameService {

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
    this.nextTurn();
  }






  nextTurn() {
    console.log('nexturn');
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {

      // #REGION TURN ENDS
      this.overviewService.clearNews();
      // update inventory after production

      // update production queue, and assets array
      // this.productionService.produceAssetsInQueue(production);

      // update construction queue, and assets array
      // fix move report to the end
      // fix rearrange genrating and content of report and order
      this.overviewService.AddNewsList(['', ' ======================  Construction Report  ======================']);
      const constructionReport = this.proceedConstructionQueue();
      this.overviewService.AddNewsList(constructionReport); // todo make production service and move it there, get production report
      this.overviewService.AddNewsList([' ==============================================================', '']);

      // ##########################################
      console.log('newMonthBegins');
      this.kolonyService.Kolony.Age += 0.1;
      // ##########################################

      // #REGION NEW TURN BEGINS
      this.assetService.ClearVolatileAssets();
      this.entityService.UpdateInventoryDueToMaintenanceCost();
      // todo MINING       // this.MiningService.mining
      this.entityService.UpdateInventoryDueToPassiveProducedItems();

      this.tradeService.PrepareIncomingShip();
      this.tradeService.SetTradeAnnouncement();

      this.overviewService.UpdateNews();
      this.overviewService.AddNewsList(constructionReport);
      this.router.navigate(['/start']);
    }, 200);
  }



  proceedConstructionQueue(): string[] {
    const report = [];
    for (const constructedItem of this.entityService.constructionQueue) {
      const maxCount = this.entityService.getPossibleConstructionQty(constructedItem);

      const countToAdd = Math.min(maxCount, constructedItem.Quantity);
      if (countToAdd === 0) {
        // no resources - info
        report.push('budowa wstrzymana, zabraklo surowcow do budowy' + constructedItem.Name + ' jakiego surka/ow?');
        break;
      }
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
        // this.commonService.removeItemFromList(this.entityService.constructionQueue, this.entityService.constructionQueue.indexOf(constructedItem));
        report.push('zakonczono budowe ' + constructedItem.Name);
      } else {
        const remainPcs = Math.ceil(constructedItem.Quantity);
        const currentProgress = remainPcs - constructedItem.Quantity;
        const currentProgressPercentage = this.commonService.ConvertToPercents(currentProgress / remainPcs, 1);
        report.push('ukonczono ' + currentProgressPercentage + '% z pozstaloych ' + remainPcs + 'pcs of ' + constructedItem.Name);
        break; // stop proceeding queue (maybe is it cool if we can build next possible builidngs in queue?)
      }
    }
    this.entityService.constructionQueue = this.entityService.constructionQueue.filter(e => e.Quantity > 0);

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



