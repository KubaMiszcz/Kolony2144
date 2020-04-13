import { GenericTypesEnum } from './../../models/enums/Types.enum';
import { BuildingNames } from './../../models/Building';
import { TradeService, TransactionTypeEnum } from './../../services/trade.service';
import { IAsset } from 'src/app/models/Entity';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { OverviewService } from 'src/app/services/overview.service';
import { GameService } from 'src/app/services/game.service';
import { AssetService } from 'src/app/services/asset.service';
import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';


@Component({
  selector: 'app-trade-overview',
  templateUrl: './trade-overview.component.html',
  styleUrls: ['./trade-overview.component.scss']
})
export class TradeOverviewComponent implements OnInit {
  playerNotes: string = '';
  crewList: IAsset[] = [];
  tradeResourcesPanelValuesFIXNAME: ITradePanelData[] = [];
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
      let shipResources = this.tradeService.tradeableResources.filter(r => r.Quantity !== 0);
      shipResources.forEach(shipAsset => {
        let a = new Object() as ITradePanelData;
        a.Name = shipAsset.Name;
        a.QtyOnTable = 0;
        a.ShipPrice = shipAsset.Price;
        a.ShipQty = Math.abs(shipAsset.Quantity);
        a.UoM = shipAsset.UoM;
        a.Type = shipAsset.Quantity > 0 ? TransactionTypeEnum.Buy : TransactionTypeEnum.Sell;

        let kolonyAsset = this.assetService.getAssetByName(shipAsset.Name);
        if (!kolonyAsset) {
          a.StockQty = 0;
          a.AVGBuyPrice = shipAsset.Price;
          a.MaxQty = Math.round(Math.abs(shipAsset.Quantity));
        } else {
          a.StockQty = kolonyAsset.Quantity;
          a.AVGBuyPrice = kolonyAsset.Price;
          a.MaxQty = Math.round(Math.min(kolonyAsset.Quantity, Math.abs(shipAsset.Quantity)));
        }

        this.tradeResourcesPanelValuesFIXNAME.push(a);
      });

      this.crewList = this.tradeService.getTradeableCrew();
      this.machinesList = this.tradeService.getTradeableMachines();
    }
  }


  ngOnDestroy(): void {
    this.gameService.playerNotes = this.playerNotes;
    this.gameService.saveGame();
  }
}

export interface ITradePanelData {
  Name: string;
  StockQty: number;
  UoM: UoMsEnum;
  AVGBuyPrice: number;
  QtyOnTable: number;
  ShipQty: number;
  ShipPrice: number;
  MaxQty: number;
  Type: TransactionTypeEnum
  // PriceChange
}



