import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from 'src/app/services/common.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset, ICountableEntity } from 'src/app/models/Entity';
import { PowerService } from '../power.service';
import { AssetService } from 'src/app/assets-module/asset.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-power-overview',
  templateUrl: './power-overview.component.html',
  styleUrls: ['./power-overview.component.scss']
})
export class PowerOverviewComponent implements OnInit {
  consumingItemsTableRows: any[] = [];
  producingItemsTableRows: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private assetService: AssetService,
    private powerService: PowerService,
  ) {
  }

  ngOnInit(): void {
    this.fillConsumingAssetList(this.powerService.powerConsumers);
    this.fillProducingAssetList(this.powerService.powerSources);
  }

  fillConsumingAssetList(resources: ICountableEntity[]) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      const perUnitUsage = this.sharedService.findItemInListByName(r.MaintenanceCost, ResourceName.Energy).Quantity;
      res.push([
        r.Name,
        r.Type,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    });

    const colNo = res[0].indexOf('total');
    res.push(['', '', '', 'Total', this.commonService.sumColumnOftable(res.slice(1), colNo)]);

    this.consumingItemsTableRows = res;
  }

  fillProducingAssetList(resources: ICountableEntity[]) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      const perUnitUsage = this.sharedService.findItemInListByName(r.PassiveIncome, ResourceName.Energy).Quantity;
      res.push([
        r.Name,
        r.Type,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    });

    const colNo = res[0].indexOf('total');
    res.push(['', '', '', 'Total', this.commonService.sumColumnOftable(res.slice(1), colNo)]);

    this.producingItemsTableRows = res;
  }




}
