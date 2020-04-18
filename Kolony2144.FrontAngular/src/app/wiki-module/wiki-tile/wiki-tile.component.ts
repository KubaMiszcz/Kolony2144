import { EntityService } from './../../services/entity.service';
import { AssetService } from 'src/app/assets-module/asset.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from '../../services/common.service';
import { IFullEntity, ISimplifiedAsset } from './../../models/Entity';
import { Component, OnInit, Input } from '@angular/core';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';

@Component({
  selector: 'app-wiki-tile',
  templateUrl: './wiki-tile.component.html',
  styleUrls: ['./wiki-tile.component.scss']
})
export class WikiTileComponent implements OnInit {
  @Input() item: IFullEntity;
  productionCost: IWikiListItem[] = [];
  producedItems: IWikiListItem[] = [];
  consumedItems: IWikiListItem[] = [];

  constructor(
    private kolonyService: KolonyService,
    private entityService: EntityService,
    private assetService: AssetService,
  ) { }

  ngOnInit() {
    if (this.item.CreationCost) { this.productionCost = this.fillList(this.item.CreationCost); }
    if (this.item.PassiveIncome) { this.producedItems = this.fillList(this.item.PassiveIncome); }
    if (this.item.MaintenanceCost) { this.consumedItems = this.fillList(this.item.MaintenanceCost); }
    console.log(this.productionCost);

  }

  fillList(list: ISimplifiedAsset[]) {
    const result = [];
    list.map(v =>
      result.push({
        Name: v.Name,
        Quantity: v.Quantity,
        UoM: this.entityService.getUoMByName(v.Name)
      })
    );

    return result;
  }
}

interface IWikiListItem {
  Name: string;
  Quantity: number;
  UoM: UoMsEnum;
}
