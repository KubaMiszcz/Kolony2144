import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AssetService } from '../assets-module/asset.service';
import { IEntity } from '../models/Entity';
import { ResourceName } from '../models/Resource';
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
  IsTurnComputingEndedSubject = new Subject<boolean>();

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
  ) { }






  nextTurn() {
    console.log('nexturn');
    this.router.navigate(['/loading-screen']);
    // this.IsTurnComputingEndedSubject.next(false);
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
        this.kolonyService.Kolony.Age += 0.1;
        this.overviewService.clearNews();
      }


      // ##########################################
      // #REGION NEW TURN BEGINS
      this.assetService.ClearVolatileAssets();
      this.entityService.UpdateInventoryDueToMaintenanceCost();
      // todo MINING       // this.MiningService.mining
      this.entityService.UpdateInventoryDueToPassiveProducedItems();

      this.tradeService.PrepareIncomingShip();
      this.tradeService.SetTradeAnnouncement();


      //   //UPDATE powerstatus with newly produced assets
      //   this.powerService.updatePowerStatus();

      // ##########################################


      // this.tradeService.setTradeAnnouncement(); console.log('setTradeAnnouncement');
      // this.kolonyService.setTradeAnnouncement();
      // this.isTurnComputing.next(false);

      this.overviewService.UpdateNews();
      this.IsTurnComputingEndedSubject.next(true);
      this.router.navigate(['/start']);
    }, 200);
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



