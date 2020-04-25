import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/assets-module/asset.service';
import { EntityTypesEnum } from 'src/app/models/enums/Types.enum';
import { OverviewService } from 'src/app/overview-module/overview.service';
import { CommonService } from 'src/app/services/common.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { GameService } from 'src/app/services/game.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { ITradePanelData } from '../ship-trade-panel/ship-trade-panel.component';
import { ICargoShip, TradeService, TransactionTypeEnum } from '../trade.service';


@Component({
  selector: 'app-trade-overview',
  templateUrl: './trade-overview.component.html',
  styleUrls: ['./trade-overview.component.scss']
})
export class TradeOverviewComponent implements OnInit {
  isShipIncoming: boolean;
  tradeAnnouncement = '';
  cargoShip: ICargoShip;


  resourcesTradePanelValues: ITradePanelData[] = [];
  crewTradePanelValues: ITradePanelData[] = [];
  machinesTradePanelValues: ITradePanelData[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private gameService: GameService,
    private assetService: AssetService,
    private tradeService: TradeService,
  ) { }

  ngOnInit() {

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

        if (cargoItem.Type === EntityTypesEnum.Resource) {
          this.resourcesTradePanelValues.push(row);
        } else if (cargoItem.Type === EntityTypesEnum.Crew) {
          this.crewTradePanelValues.push(row);
        } else if (cargoItem.Type === EntityTypesEnum.Machine) {
          this.machinesTradePanelValues.push(row);
        }
      });
    }
  }


}





