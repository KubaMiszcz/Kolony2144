import { IAsset, IInventoryItemShort } from '../../models/Entity';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit, Input } from '@angular/core';
import { IEntity, IInventoryItem } from 'src/app/models/Entity';
import { StarterInventoryItems } from 'src/app/models/InventoryItem';
import { UoMs } from 'src/app/models/enums/UOMs.enum';

@Component({
  selector: 'app-wiki-tile',
  templateUrl: './wiki-tile.component.html',
  styleUrls: ['./wiki-tile.component.scss']
})
export class WikiTileComponent implements OnInit {
  @Input() item: IAsset;
  productionCostList: IproductionCost[] = [];
  ProducedByList: IproductionCost[] = [];
  consumedByList: IproductionCost[] = [];



  constructor(
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.productionCostList = this.fillList(this.item.ProductionCost);
    if (this.item.ProducedItems) this.ProducedByList = this.fillList(this.item.ProducedItems);
    if (this.item.ConsumedItems) this.consumedByList = this.fillList(this.item.ConsumedItems);
  }

  fillList(list: IInventoryItemShort[]) {
    let result = [];
    list.forEach(pc => {
      let uom = this.sharedService.getUoM(pc);
      result.push({ Name: pc.Name, QtyPerUnit: pc.Quantity, UoM: uom });
    });
    return result;
  }
}

interface IproductionCost {
  Name: string;
  QtyPerUnit: number;
  UoM: UoMs
}
