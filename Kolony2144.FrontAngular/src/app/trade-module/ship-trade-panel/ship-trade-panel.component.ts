import { Component, OnInit, Input } from '@angular/core';
import { IAsset } from 'src/app/models/Entity';

@Component({
  selector: 'app-ship-trade-panel',
  templateUrl: './ship-trade-panel.component.html',
  styleUrls: ['./ship-trade-panel.component.scss']
})
export class ShipTradePanelComponent implements OnInit {
  @Input() resourcesList: IAsset[] = [];
  @Input() shipResourcesList: IAsset[] = [];

  constructor() { }

  ngOnInit() { }
}
