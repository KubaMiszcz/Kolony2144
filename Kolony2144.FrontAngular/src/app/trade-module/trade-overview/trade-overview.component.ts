import { BuildingNames } from './../../models/Building';
import { TradeService } from './../../services/trade.service';
import { IAsset } from 'src/app/models/Entity';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { OverviewService } from 'src/app/services/overview.service';
import { GameService } from 'src/app/services/game.service';
import { AssetService } from 'src/app/services/asset.service';
import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-trade-overview',
  templateUrl: './trade-overview.component.html',
  styleUrls: ['./trade-overview.component.scss']
})
export class TradeOverviewComponent implements OnInit {
  playerNotes: string = '';
  crewList: IAsset[] = [];
  resourcesList: IAsset[] = [];
  machinesList: IAsset[] = [];
  isShipIncoming: boolean;

  constructor(
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private gameService: GameService,
    private assetService: AssetService,
    private tradeService: TradeService,
  ) { }

  ngOnInit() {
    this.playerNotes = this.gameService.playerNotes;
    this.isShipIncoming = this.tradeService.isShipIncoming;
    this.isShipIncoming = true;
    if (this.isShipIncoming) {
      let stockResources = this.assetService.getAllResources();
      this.resourcesList = this.tradeService.tradeableResources;

      this.crewList = this.tradeService.getTradeableCrew();
      this.machinesList = this.tradeService.getTradeableMachines();
    }
  }

  ngOnDestroy(): void {
    this.gameService.playerNotes = this.playerNotes;
  }

}

export interface ITradePanelData {
  Name: string;
  StockQty: number
  AVGBuyPrice: number
  // QtyOnTable: number;
  ShipQqty: number
  ShipPrice: number
  // PriceChange
}

