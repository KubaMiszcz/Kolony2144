import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';
import { IAsset } from './../../models/Entity';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { Kolony } from 'src/app/models/Kolony';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  kolony: Kolony;
  resourcesList: any[];

  constructor(
    private kolonyService: KolonyService,
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit() {
    this.resourcesList = this.fillResourcesList(this.kolonyService.getKolonyAssetsByType(AssetTypesEnum.Resource));
  }

  fillResourcesList(resources: IAsset[]): any[] {
    let res = [['name', 'qty'],
    ...resources.map(r => [r.Name, r.Quantity])
    ];
    return res;
  }

}
