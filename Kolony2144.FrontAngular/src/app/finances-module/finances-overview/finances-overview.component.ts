import { AssetService } from './../../services/asset.service';
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
  assetList: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService,
    private assetService: AssetService,
  ) { }

  ngOnInit(): void {
    this.assetList = this.fillAssetList(this.assetService.getAssetsByConsumedAssetName(ResourceName.Cash));
  }

  fillAssetList(resources: IAsset[]): any[] {
    const res: any[] = [
      ['name', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      const perUnitUsage = this.assetService.findSimplifiedResourceInListByName(r.MaintenanceCost, ResourceName.Cash).Quantity;
      res.push([
        r.Name,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    });
    res.push(['', '', 'Total', this.sharedService.sumColumnOftable(res.slice(1), 3)]);

    return res;
  }

}
