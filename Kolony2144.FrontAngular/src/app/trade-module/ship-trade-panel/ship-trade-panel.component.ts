import { ITradePanelData } from './../trade-overview/trade-overview.component';
import { Component, OnInit, Input } from '@angular/core';
import { IAsset } from 'src/app/models/Entity';
import { TradeService, TransactionTypeEnum } from './../../services/trade.service';

@Component({
  selector: 'app-ship-trade-panel',
  templateUrl: './ship-trade-panel.component.html',
  styleUrls: ['./ship-trade-panel.component.scss']
})
export class ShipTradePanelComponent implements OnInit {
  @Input() tradePanelData: ITradePanelData[] = [];
  typeBuy = TransactionTypeEnum.Buy;
  typeSell = TransactionTypeEnum.Sell;

  constructor(
    private tradeService: TradeService,
  ) { }

  ngOnInit() { }

  updateTableQty(row: ITradePanelData, val) {
    if (val === 'max') {
      row.QtyOnTable = row.MaxQty;
    } else if (val === 0) {
      row.QtyOnTable = 0;
    } else {
      row.QtyOnTable += val;
    }
  }

  doTransaction(row: ITradePanelData) {
    //todo make update rowmaxqty on table
    // update row values for kolony qty
    // check sell if no stockqty
    // check buy if no cash etc
    //check buy if no shipqty
    //todo make other validation to not sell negative values etc
    row.ShipQty -= row.QtyOnTable;
    this.tradeService.DoTransaction(row.Type, row.Name, row.QtyOnTable, row.ShipPrice);
  }

}
