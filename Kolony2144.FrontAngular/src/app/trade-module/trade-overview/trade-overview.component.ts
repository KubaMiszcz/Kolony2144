import { GenericTypesEnum } from './../../models/enums/Types.enum';
import { BuildingNames } from './../../models/Building';
import { TradeService } from './../../services/trade.service';
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
      let stockResources = this.assetService.getAllResources().filter(r => r.Tags.includes(GenericTypesEnum.Tradeable));
      let shipResources = this.tradeService.tradeableResources.filter(r => r.Quantity !== 0);
      shipResources.forEach(r => {

        this.tradeResourcesPanelValuesFIXNAME.push(
          {
            Name: r.Name,
            StockQty: this.getStockQtyForShipAsset(r),
            UoM: r.UoM,
            AVGBuyPrice: this.getStockPriceForShipAsset(r),
            QtyOnTable: 0,
            ShipPrice: r.Price,
            ShipQty: r.Quantity
          }
        );
      });

      this.crewList = this.tradeService.getTradeableCrew();
      this.machinesList = this.tradeService.getTradeableMachines();
    }
  }

  getStockPriceForShipAsset(asset: IAsset): number {
    let kolonyAsset = this.assetService.getAssetByName(asset.Name);
    return !!kolonyAsset ? kolonyAsset.Price : 0;
  }


  getStockQtyForShipAsset(asset: IAsset): number {
    let kolonyAsset = this.assetService.getAssetByName(asset.Name);
    return !!kolonyAsset ? kolonyAsset.Quantity : 0;
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
  // PriceChange
}

