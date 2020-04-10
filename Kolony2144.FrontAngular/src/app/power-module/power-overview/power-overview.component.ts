import { AssetService } from './../../services/asset.service';
import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset } from 'src/app/models/Entity';

@Component({
  selector: 'app-power-overview',
  templateUrl: './power-overview.component.html',
  styleUrls: ['./power-overview.component.scss']
})
export class PowerOverviewComponent implements OnInit {
  assetsConsumingList: any[];
  assetsProducingList: any[];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService,
    private assetService: AssetService,
  ) {
  }

  ngOnInit(): void {
    this.assetsConsumingList = this.fillConsumungAssetList(this.assetService.getAssetsByConsumedAssetName(ResourceName.Energy))
    this.assetsProducingList = this.fillProducingAssetList(this.assetService.getAssetsByProducedAssetName(ResourceName.Energy))
  }

  fillConsumungAssetList(resources: IAsset[]): any[] {
    let res: any[] = [
      ['name', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      let perUnitUsage = this.assetService.findSimplifiedResourceInListByName(r.MaintenanceCost, ResourceName.Energy).Quantity;
      res.push([
        r.Name,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    })
    res.push(['', '', 'Total', this.sharedService.sumColumnOftable(res.slice(1), 3)])
    return res;
  }

  fillProducingAssetList(resources: IAsset[]): any[] {
    let res: any[] = [
      ['name', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      let perUnitUsage = this.assetService.findSimplifiedResourceInListByName(r.PassiveIncome, ResourceName.Energy).Quantity;
      res.push([
        r.Name,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    })
    res.push(['', '', 'Total', this.sharedService.sumColumnOftable(res.slice(1), 3)])
    return res;
  }

}
