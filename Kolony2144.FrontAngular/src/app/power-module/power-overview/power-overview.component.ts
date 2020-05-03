import { Component, OnInit } from '@angular/core';
import { AssetService } from 'src/app/assets-module/asset.service';
import { IEntity } from 'src/app/models/Entity';
import { GenericTypesEnum } from 'src/app/models/enums/Types.enum';
import { ResourceName } from 'src/app/models/Resource';
import { CommonService } from 'src/app/services/common.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { PowerService } from '../power.service';

@Component({
  selector: 'app-power-overview',
  templateUrl: './power-overview.component.html',
  styleUrls: ['./power-overview.component.scss']
})
export class PowerOverviewComponent implements OnInit {
  consumingItemsTableRows: any[] = [];
  producingItemsTableRows: any[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
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
