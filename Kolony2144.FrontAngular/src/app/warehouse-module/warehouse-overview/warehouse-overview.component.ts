import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/Entity';
import { ResourceName } from 'src/app/models/Resource';
import { CommonService } from 'src/app/services/common.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { WarehouseService } from '../warehouse.service';
import { GenericTypesEnum } from './../../models/enums/Types.enum';

@Component({
  selector: 'app-warehouse-overview',
  templateUrl: './warehouse-overview.component.html',
  styleUrls: ['./warehouse-overview.component.scss']
})
export class WarehouseOverviewComponent implements OnInit {
  storedItemsTableRows: any[] = [];
  storageProvidersItemsTableRows: any[] = [];
  totalStorageUsagePercent: number;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private warehouseService: WarehouseService,
    private kolonyService: KolonyService
  ) { }

  ngOnInit(): void {
    this.totalStorageUsagePercent = this.commonService.ConvertToPercents(this.warehouseService.totalStorageUsage / this.warehouseService.totalStorageCapacity, 1);

    this.kolonyService.KolonyStateUpdatedSubject.subscribe(() => {
      this.totalStorageUsagePercent = this.commonService.ConvertToPercents(this.warehouseService.totalStorageUsage / this.warehouseService.totalStorageCapacity, 1);
    });


    this.storedItemsTableRows = this.fillSummaryTableRows(
      this.warehouseService.storedItems,
      ResourceName.StorageSpace,
      GenericTypesEnum.Consuming,
      this.warehouseService.totalStorageCapacity
    );

    this.storageProvidersItemsTableRows = this.fillSummaryTableRows(
      this.warehouseService.storageProviders,
      ResourceName.StorageSpace,
      GenericTypesEnum.Producing,
      this.warehouseService.totalStorageCapacity
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
      this.commonService.sumColumnOftableByHeader(res, resourceName + ' total'), '']);


    return res;
  }

}

