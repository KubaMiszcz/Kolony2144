import { SharedService } from 'src/app/services/shared.service';
import { SharedModule } from './../../shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset } from 'src/app/models/Entity';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss']
})
export class FinancesOverviewComponent implements OnInit {
  kolony: Kolony;
  assetList: any[];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService,
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit(): void {
    this.assetList = this.fillAssetList(this.kolonyService.getAssetsListByConsumedAssetName(ResourceName.Cash))
  }

  fillAssetList(resources: IAsset[]): any[] {
    let res: any[] = [
      ['name', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      let perUnitUsage = this.kolonyService.findResourceInAssetByName(r.MaintenanceCost, ResourceName.Cash).Quantity;
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
