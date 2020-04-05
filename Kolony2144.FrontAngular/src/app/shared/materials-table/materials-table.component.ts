import { IAsset } from '../../models/Entity';
import { Component, OnInit, Input } from '@angular/core';
import { IInventoryItem } from 'src/app/models/Entity';

@Component({
  selector: 'app-materials-table',
  templateUrl: './materials-table.component.html',
  styleUrls: ['./materials-table.component.scss']
})
export class MaterialsTableComponent implements OnInit {
  @Input() caption = '';
  @Input() title = '';
  @Input() table: IInventoryItem[] = [];
  @Input() total: number = 0;
  @Input() showTotal = false;

  constructor() { }

  ngOnInit() {
  }
}
