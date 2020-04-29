import { CrewService } from './../crew.service';
import { AssetService } from '../../assets-module/asset.service';
import { Component, OnInit } from '@angular/core';
import { ResourceName } from 'src/app/models/Resource';
import { EntityTypesEnum, GenericTypesEnum } from 'src/app/models/enums/Types.enum';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { EntityService } from 'src/app/services/entity.service';
import { IEntity } from 'src/app/models/Entity';

@Component({
  selector: 'app-crew-overview',
  templateUrl: './crew-overview.component.html',
  styleUrls: ['./crew-overview.component.scss']
})
export class CrewOverviewComponent implements OnInit {
  cashConsumptionList: any[] = [];
  foodConsumptionList: any[] = [];
  basicWorkUnitProductionList: any[] = [];
  advancedWorkUnitProductionList: any[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService,
    private crewService: CrewService
  ) { }

  ngOnInit() {
    this.cashConsumptionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.Cash,
      GenericTypesEnum.Consuming
    );
    this.foodConsumptionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.Food,
      GenericTypesEnum.Consuming
    );
    this.basicWorkUnitProductionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.BasicWorkUnit,
      GenericTypesEnum.Producing
    );
    this.advancedWorkUnitProductionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.AdvancedWorkUnit,
      GenericTypesEnum.Producing
    );





    // this.fillPerUnitSummary();
    // this.fillTotalSummary();
  }

  fillSummaryTableRows(entities: IEntity[], resourceName: ResourceName, type: GenericTypesEnum) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', resourceName + ' total', '%']
    ];


    const referenceQty = type === GenericTypesEnum.Consuming ?
      this.entityService.getTotalEntityConsumptionQtyByName(resourceName)
      : this.entityService.getTotalEntityProductionQtyByName(resourceName);


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
