import { FinanceService } from './../finance.service';
import { AssetService } from '../../assets-module/asset.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedModule } from './../../shared/shared.module';
import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset, ICountableEntity } from 'src/app/models/Entity';
import { SharedService } from 'src/app/services/shared.service';

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
    // todo switch to new method
    this.fillAssetListDEPR(this.financeService.cashConsumers);
  }

  fillAssetListDEPR(resources: ICountableEntity[]) {
    const res: any[] = [
      ['name', 'type', 'per unit', 'qty', 'total']
    ];

    resources.forEach(r => {
      const perUnitUsage = this.sharedService.findItemInListByName(r.MaintenanceCost, ResourceName.Cash).Quantity;
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

    this.financeItemsTableRows = res;
  }

}
