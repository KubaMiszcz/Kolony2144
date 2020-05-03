import { DataProviderService } from '../../services/data-provider.service';
import { GameService } from './../../services/game.service';
import { FinanceService } from '../../finances-module/finance.service';
import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IAsset } from 'src/app/models/Entity';
import { TradeService, TransactionTypeEnum } from '../trade.service';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';
import { AssetService } from 'src/app/assets-module/asset.service';
import { CommonService } from 'src/app/services/common.service';

export interface ITradePanelData {
  Name: string;
  KolonyQty: number;
  UoM: UoMsEnum;
  AVGBuyPrice: number;
  QtyOnTable: number;
  ShipQty: number;
  ShipPrice: number;
  MaxQty: number;
  Type: TransactionTypeEnum;
  // PriceChange
}


@Component({
  selector: 'app-ship-trade-panel',
  templateUrl: './ship-trade-panel.component.html',
  styleUrls: ['./ship-trade-panel.component.scss']
})
export class ShipTradePanelComponent implements OnInit {
  @Input() tradePanelData: ITradePanelData[] = [];
  typeBuy = TransactionTypeEnum.Buy;
  typeSell = TransactionTypeEnum.Sell;
  // @ViewChild('tableQtyRef') tableQty: ElementRef;

  constructor(
    private commonService: CommonService,
    private tradeService: TradeService,
    private dataProviderService: DataProviderService,
    private assetService: AssetService,
    private gameService: GameService,
  ) { }

  ngOnInit() {
    this.tradePanelData.forEach(row => this.updateMaxTableQty(row));
  }

  updateMaxTableQty(row: ITradePanelData) {
    if (row.Type === TransactionTypeEnum.Buy) {
      row.MaxQty = Math.floor(row.ShipQty);
    } else {
      row.MaxQty = Math.floor(Math.min(row.KolonyQty, row.ShipQty));
    }
  }

  updateOnTableQty(row: ITradePanelData, val: number) {
    if (val === 0) {
      row.QtyOnTable = 0;
    } else {
      row.QtyOnTable += val;
      this.getCheckedMinMaxQtyOnTable(row);
    }
  }

  getCheckedMinMaxQtyOnTable(row: ITradePanelData) {
    if (row.QtyOnTable > row.MaxQty) {
      row.QtyOnTable = row.MaxQty;
    } else if (row.QtyOnTable < 0) {
      row.QtyOnTable = 0;
    }

    return row.QtyOnTable;
  }

  // doTransaction2(row: ITradePanelData) {
  //   // todo check buy if no cash etc
  //   row.QtyOnTable = this.getCheckedMinMaxQtyOnTable(row);
  //   row.ShipQty -= row.QtyOnTable;

  //   // add if doesnt exist in kolony
  //   let asset = this.assetService.getAssetByName(row.Name);
  //   if (!asset) {
  //     // todo create new isnatnce of all assets list in trade service
  //     const newAsset = this.dataProviderService.getEntityByName(row.Name); // get from all
  //     // fixit _____________________________________________________vvvvvvv
  //     asset = this.assetService.addNewAssetToInventory(newAsset as IAsset, row.QtyOnTable, row.AVGBuyPrice); // get newly added from kolony assets
  //   }

  //   if (row.Type === TransactionTypeEnum.Buy) {
  //     row.KolonyQty += row.QtyOnTable;
  //   } else {
  //     row.KolonyQty -= row.QtyOnTable;
  //   }

  //   this.tradeService.proceedTransaction(row.Type, asset, row.QtyOnTable, row.ShipPrice);
  //   row.AVGBuyPrice = this.assetService.getAssetByName(row.Name).Price;

  //   this.updateMaxTableQty(row);
  //   // this.tableQty.nativeElement.value = 0;
  // }


  doTransaction(row: ITradePanelData) {
    // todo check buy if no cash etc
    row.QtyOnTable = this.getCheckedMinMaxQtyOnTable(row);

    this.tradeService.proceedTransaction(row.Type, row.Name, row.QtyOnTable, row.ShipPrice);
    row.AVGBuyPrice = this.assetService.getAssetByName(row.Name).Price;

    if (row.Type === TransactionTypeEnum.Buy) {
      row.KolonyQty += row.QtyOnTable;
      row.ShipQty -= row.QtyOnTable;
    } else {
      row.KolonyQty -= row.QtyOnTable;
      row.ShipQty += row.QtyOnTable;
    }

    this.updateMaxTableQty(row);
    // this.tableQty.nativeElement.value = 0;
  }

}


