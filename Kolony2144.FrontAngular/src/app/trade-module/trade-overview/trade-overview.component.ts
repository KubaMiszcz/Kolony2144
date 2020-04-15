import { GenericTypesEnum } from './../../models/enums/Types.enum';
import { BuildingNames } from './../../models/Building';
import { TradeService, TransactionTypeEnum, ICargoShip } from './../../services/trade.service';
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
  isShipIncoming: boolean;
  tradeAnnouncement = '';
  cargoShip: ICargoShip;


  resourcesTradePanelValues: ITradePanelData[] = [];
  crewTradePanelValues: ITradePanelData[] = [];
  machinesTradePanelValues: ITradePanelData[] = [];

  constructor(
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private gameService: GameService,
    private assetService: AssetService,
    private tradeService: TradeService,
  ) { }

  ngOnInit() {
    this.gameService.PlayerNotesBS.subscribe(c => this.playerNotes = c);

    this.tradeAnnouncement = this.tradeService.tradeAnnouncement;
    this.isShipIncoming = this.tradeService.isShipLanded;
    if (this.isShipIncoming) {
      this.tradeService.landedShip.Cargo.forEach(cargoItem => {
        const row = new Object() as ITradePanelData;
        row.Name = cargoItem.Name;
        row.QtyOnTable = 0;
        row.ShipPrice = cargoItem.Price;
        row.ShipQty = Math.abs(cargoItem.Quantity);
        row.UoM = cargoItem.UoM;
        row.Type = cargoItem.Quantity > 0 ? TransactionTypeEnum.Buy : TransactionTypeEnum.Sell;

        const kolonyAsset = this.assetService.getAssetByName(cargoItem.Name);
        if (!kolonyAsset) {
          row.KolonyQty = 0;
          row.AVGBuyPrice = 0;
        } else {
          row.KolonyQty = kolonyAsset.Quantity;
          row.AVGBuyPrice = kolonyAsset.Price;
        }

        if (cargoItem.Type === AssetTypesEnum.Resource) {
          this.resourcesTradePanelValues.push(row);
        } else if (cargoItem.Type === AssetTypesEnum.Crew) {
          this.crewTradePanelValues.push(row);
        } else if (cargoItem.Type === AssetTypesEnum.Machine) {
          this.machinesTradePanelValues.push(row);
        }
      });
    }
  }


  ngOnDestroy(): void {
    this.gameService.PlayerNotes = this.playerNotes;
  }
}





