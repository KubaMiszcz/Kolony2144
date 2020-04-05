import { SharedService } from './../../services/shared.service';
import { IWikiEntity, ISimpleAsset } from './../../models/Entity';
import { Component, OnInit, Input } from '@angular/core';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';

@Component({
  selector: 'app-wiki-tile',
  templateUrl: './wiki-tile.component.html',
  styleUrls: ['./wiki-tile.component.scss']
})
export class WikiTileComponent implements OnInit {
  @Input() item: IWikiEntity;
  productionCost: IWikiListItem[] = [];
  producedItems: IWikiListItem[] = [];
  consumedItems: IWikiListItem[] = [];

  constructor(
    private SharedService: SharedService
  ) { }

  ngOnInit() {
    if (this.item.ProductionCost) this.productionCost = this.fillList(this.item.ProductionCost);
    if (this.item.ProducedItems) this.producedItems = this.fillList(this.item.ProducedItems);
    if (this.item.ConsumedItems) this.consumedItems = this.fillList(this.item.ConsumedItems);
    console.log(this.productionCost);

  }

  fillList(list: ISimpleAsset[]) {
    let result = [];
    list.map(v =>
      result.push({
        Name: v.Name,
        Quantity: v.Quantity,
        UoM: this.SharedService.getUoMForSimpleAsset(v)
      })
    );
    return result;
  }
}

interface IWikiListItem {
  Name: string;
  Quantity: number;
  UoM: UoMsEnum
}
