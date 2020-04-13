import { ITradePanelData } from './../trade-overview/trade-overview.component';
import { Component, OnInit, Input } from '@angular/core';
import { IAsset } from 'src/app/models/Entity';

@Component({
  selector: 'app-ship-trade-panel',
  templateUrl: './ship-trade-panel.component.html',
  styleUrls: ['./ship-trade-panel.component.scss']
})
export class ShipTradePanelComponent implements OnInit {
  @Input() tradePanelData: ITradePanelData[] = [];

  constructor() { }

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




}
