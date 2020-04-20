import { GenericTypesEnum } from './../../models/enums/Types.enum';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { IEntity } from 'src/app/models/Entity';
import { ResourceName } from 'src/app/models/Resource';
import { WarehouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-overview',
  templateUrl: './warehouse-overview.component.html',
  styleUrls: ['./warehouse-overview.component.scss']
})
export class WarehouseOverviewComponent implements OnInit {

  storedItemsTableRows: any[] = [];
  storageProvidersItemsTableRows: any[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
    private warehouseService: WarehouseService,
  ) { }

  ngOnInit(): void {
    this.storedItemsTableRows = this.fillSummaryTableRows(
      this.warehouseService.storedItems,
      ResourceName.StorageSpace,
      GenericTypesEnum.Consuming
    );

    this.storageProvidersItemsTableRows = this.fillSummaryTableRows(
      this.warehouseService.storageProviders,
      ResourceName.StorageSpace,
      GenericTypesEnum.Producing
    );

  }


  fillSummaryTableRows(entities: IEntity[], resourceName: ResourceName, type: GenericTypesEnum) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', resourceName+ ' total', '%']
    ];

    entities.forEach(r => {
      const list = type === GenericTypesEnum.Consuming ? r.MaintenanceCost : r.PassiveIncome;
      const perUnitUsage = this.sharedService.findItemInListByName(list, resourceName).Quantity;
      res.push([
        r.Name,
        r.Type,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage,
        'fix'
      ]);
    });

    const colNo = res[0].indexOf('total');
    res.push(['', '', '', 'Total', this.commonService.sumColumnOftable(res.slice(1), colNo), '']);

    return res;
  }

}

