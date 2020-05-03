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
      GenericTypesEnum.Consuming,
      this.entityService.getTotalEntityConsumptionQtyByNameFromList(ResourceName.Cash, this.crewService.crewList)
    );
    this.foodConsumptionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.Food,
      GenericTypesEnum.Consuming,
      this.entityService.getTotalEntityConsumptionQtyByNameFromList(ResourceName.Food, this.crewService.crewList)
    );
    this.basicWorkUnitProductionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.BasicWorkUnit,
      GenericTypesEnum.Producing,
      this.entityService.getTotalEntityProductionQtyByNameFromList(ResourceName.BasicWorkUnit, this.crewService.crewList)
    );
    this.advancedWorkUnitProductionList = this.fillSummaryTableRows(
      this.crewService.crewList,
      ResourceName.AdvancedWorkUnit,
      GenericTypesEnum.Producing,
      this.entityService.getTotalEntityProductionQtyByNameFromList(ResourceName.AdvancedWorkUnit, this.crewService.crewList)
    );





    // this.fillPerUnitSummary();
    // this.fillTotalSummary();
  }

  fillSummaryTableRows(entities: IEntity[], resourceName: ResourceName, type: GenericTypesEnum, referenceQty?: number) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', resourceName + ' total', '%']
    ];

    if (!referenceQty) {
      referenceQty = type === GenericTypesEnum.Consuming ?
        this.entityService.getTotalEntityConsumptionQtyByName(resourceName)
        : this.entityService.getTotalEntityProductionQtyByName(resourceName);
    }

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
        // this.commonService.Round(perUnitUsage, 1),
        // this.commonService.Round(r.Quantity, 1),
        // this.commonService.Round(r.Quantity * perUnitUsage, 1),
        this.commonService.ConvertToPercents(usage, 1) + '%'
      ]);
    });

    res.push(['', '', '', 'Total',
      this.commonService.sumColumnOftableByHeader(res, resourceName + ' total')]);


    return res;
  }














}
