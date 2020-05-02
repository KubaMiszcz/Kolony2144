import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/Entity';
import { GenericTypesEnum } from 'src/app/models/enums/Types.enum';
import { ResourceName } from 'src/app/models/Resource';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { FinanceService } from '../finance.service';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss']
})
export class FinancesOverviewComponent implements OnInit {
  financeItemsTableRows: any[] = [];
  cashConsumers: IEntity[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private financeService: FinanceService,
  ) { }

  ngOnInit(): void {
    this.cashConsumers = this.financeService.cashConsumers;

    this.financeItemsTableRows = this.fillSummaryTableRows(
      this.cashConsumers,
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
