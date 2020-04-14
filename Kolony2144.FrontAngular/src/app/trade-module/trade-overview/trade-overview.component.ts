import { GenericTypesEnum } from './../../models/enums/Types.enum';
import { BuildingNames } from './../../models/Building';
import { TradeService, TransactionTypeEnum } from './../../services/trade.service';
import { IAsset } from 'src/app/models/Entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { OverviewService } from 'src/app/services/overview.service';
import { GameService } from 'src/app/services/game.service';
import { AssetService } from 'src/app/services/asset.service';
import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';
import { ITradePanelData } from '../ship-trade-panel/ship-trade-panel.component';


@Component({
  selector: 'app-trade-overview',
  templateUrl: './trade-overview.component.html',
  styleUrls: ['./trade-overview.component.scss']
})
export class TradeOverviewComponent implements OnInit, OnDestroy {
  playerNotes = '';
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
    this.gameService.PlayerNotesBS.subscribe(c => this.playerNotes = c);
    this.isShipIncoming = this.tradeService.isShipIncoming;
    this.isShipIncoming = true;
    if (this.isShipIncoming) {
      const shipResources = this.tradeService.tradeableResources.filter(r => r.Quantity !== 0);
      shipResources.forEach(shipAsset => {
        const a = new Object() as ITradePanelData;
        a.Name = shipAsset.Name;
        a.QtyOnTable = 0;
        a.ShipPrice = shipAsset.Price;
        a.ShipQty = Math.abs(shipAsset.Quantity);
        a.UoM = shipAsset.UoM;
        a.Type = shipAsset.Quantity > 0 ? TransactionTypeEnum.Buy : TransactionTypeEnum.Sell;

        const kolonyAsset = this.assetService.getAssetByName(shipAsset.Name);
        if (!kolonyAsset) {
          a.KolonyQty = 0;
          a.AVGBuyPrice = 0;
        } else {
          a.KolonyQty = kolonyAsset.Quantity;
          a.AVGBuyPrice = kolonyAsset.Price;
        }

        this.tradeResourcesPanelValuesFIXNAME.push(a);
      });

      this.crewList = this.tradeService.getTradeableCrew();
      this.machinesList = this.tradeService.getTradeableMachines();
    }
  }


  ngOnDestroy(): void {
    this.gameService.PlayerNotes = this.playerNotes;
  }
}





