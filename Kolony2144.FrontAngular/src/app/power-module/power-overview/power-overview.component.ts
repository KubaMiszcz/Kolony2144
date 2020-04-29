import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from 'src/app/services/common.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset, IEntity } from 'src/app/models/Entity';
import { PowerService } from '../power.service';
import { AssetService } from 'src/app/assets-module/asset.service';
import { SharedService } from 'src/app/services/shared.service';
import { GenericTypesEnum } from 'src/app/models/enums/Types.enum';

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
    this.consumingItemsTableRows = this.fillSummaryTableRows(
      this.powerService.powerConsumers,
      ResourceName.Energy,
      GenericTypesEnum.Consuming,
      this.powerService.totalEnergyProduction
    );

    this.producingItemsTableRows = this.fillSummaryTableRows(
      this.powerService.powerSources,
      ResourceName.Energy,
      GenericTypesEnum.Producing,
      this.powerService.totalEnergyProduction
    );
  }


  fillSummaryTableRows(entities: IEntity[], resourceName: ResourceName, type: GenericTypesEnum, referenceQty: number) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', resourceName + ' total', '%']
    ];

    entities.forEach(r => {
      const list = type === GenericTypesEnum.Consuming ? r.MaintenanceCost : r.PassiveIncome;
      const perUnitUsage = this.sharedService.findItemInListByName(list, resourceName)?.Quantity ?? 0;
      const usage = (r.Quantity * perUnitUsage) / referenceQty;
      res.push([
        r.Name,
        r.Type,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage,
        this.commonService.ConvertToPercents(usage, 1) + '%'
      ]);
    });

    res.push(['', '', '', 'Total',
      this.commonService.sumColumnOftableByHeader(res, resourceName + ' total')]);


    return res;
  }


}
