import { FinanceService } from './../finance.service';
import { AssetService } from '../../assets-module/asset.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedModule } from './../../shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset, IEntity } from 'src/app/models/Entity';
import { SharedService } from 'src/app/services/shared.service';
import { GenericTypesEnum } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss']
})
export class FinancesOverviewComponent implements OnInit {
  financeItemsTableRows: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private commonService: CommonService,
    private sharedService: SharedService,
    private financeService: FinanceService,
  ) { }

  ngOnInit(): void {
    this.financeItemsTableRows = this.fillSummaryTableRows(
      this.financeService.cashConsumers,
      ResourceName.Cash,
      GenericTypesEnum.Consuming,
      this.financeService.totalCashConsumption
    );
  }

  fillSummaryTableRows(entities: IEntity[], resourceName: ResourceName, type: GenericTypesEnum, referenceQty: number) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', resourceName + ' total', '%']
    ];

    entities.forEach(r => {
      const list = type === GenericTypesEnum.Consuming ? r.MaintenanceCost : r.PassiveIncome;
      const perUnitUsage = this.sharedService.findItemInListByName(list, resourceName).Quantity;
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
