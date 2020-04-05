import { IAsset } from '../../models/Entity';
import { Component, OnInit, Input } from '@angular/core';
import { IInventoryItem } from 'src/app/models/Entity';

@Component({
  selector: 'app-assets-table',
  templateUrl: './assets-table.component.html',
  styleUrls: ['./assets-table.component.scss']
})
export class AssetsTableComponent implements OnInit {
  @Input() caption = '';
  @Input() headers = '';
  @Input() list: IAsset[] = [];
  table: any[] = [];
  @Input() footers = '';
  @Input() isTotalsShow = false;

  constructor() { }

  ngOnInit() {
  }
}
