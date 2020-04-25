import { AssetService } from '../../assets-module/asset.service';
import { Component, OnInit } from '@angular/core';
import { ResourceName } from 'src/app/models/Resource';
import { EntityTypesEnum } from 'src/app/models/enums/Types.enum';
import { SharedService } from 'src/app/services/shared.service';
import { CommonService } from 'src/app/services/common.service';
import { EntityService } from 'src/app/services/entity.service';

@Component({
  selector: 'app-crew-overview',
  templateUrl: './crew-overview.component.html',
  styleUrls: ['./crew-overview.component.scss']
})
export class CrewOverviewComponent implements OnInit {
  perUnitHeader: any[] = [];
  perUnitList: any[][] = [];
  perUnitFooter: any[] = [];
  totalHeader: any[] = [];
  totalList: any[][] = [];
  totalFooter: any[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService
  ) {
  }

  ngOnInit() {
    this.fillPerUnitSummary();
    this.fillTotalSummary();
  }

  fillPerUnitSummary() {
    this.perUnitHeader = [
      'Name',
      'Salary per Unit',
      ResourceName.Food + ' Consumption per Unit',
      ResourceName.BasicWorkUnit + ' Production per Unit',
      'Total Qty',
    ];

    this.assetService.getAssetsByTypeDEPR(EntityTypesEnum.Crew).forEach(c => {
      const name = c.Name;
      const salary = this.sharedService.findItemInListByName(c.MaintenanceCost, ResourceName.Cash).Quantity;
      const foodConsumption = this.sharedService.findItemInListByName(c.MaintenanceCost, ResourceName.Food).Quantity;
      const BasicWU = this.sharedService.findItemInListByName(c.PassiveIncome, ResourceName.BasicWorkUnit).Quantity;
      const qty = c.Quantity;
      this.perUnitList.push([
        name,
        salary,
        foodConsumption,
        BasicWU,
        qty,
      ]);
    });

    // this.perUnitFooter = [...(new Array(3)),
  }

  fillTotalSummary() {
    this.totalHeader = [
      'Name',
      'Total Qty',
      'Total Salary',
      'Total ' + ResourceName.Food + ' Consumption',
      'Total ' + ResourceName.BasicWorkUnit + ' Production',
      'Total ' + ResourceName.AdvancedWorkUnit + ' Production',
    ];

    this.assetService.getAssetsByTypeDEPR(EntityTypesEnum.Crew).forEach(c => {
      const name = c.Name;
      const salary = this.sharedService.findItemInListByName(c.MaintenanceCost, ResourceName.Cash).Quantity;
      const foodConsumption = this.sharedService.findItemInListByName(c.MaintenanceCost, ResourceName.Food).Quantity;
      const BasicWU = this.sharedService.findItemInListByName(c.PassiveIncome, ResourceName.BasicWorkUnit).Quantity;
      const AdvancedWU = this.sharedService.findItemInListByName(c.PassiveIncome, ResourceName.AdvancedWorkUnit)?.Quantity;


      const qty = c.Quantity;
      this.totalList.push([
        name,
        qty,
        salary * qty,
        foodConsumption * qty,
        BasicWU * qty,
        (AdvancedWU ?? 0) * qty,
      ]);
    });

    this.totalFooter = [
      'Total:',
      this.commonService.sumColumnOftable(this.totalList, 1),
      this.commonService.sumColumnOftable(this.totalList, 2),
      this.commonService.sumColumnOftable(this.totalList, 3),
      this.commonService.sumColumnOftable(this.totalList, 4),
      this.commonService.sumColumnOftable(this.totalList, 5),
    ];
  }

  // Name: CrewNames.Worker,
  // Description: 'just worker', ImageUrl: '',
  // Size: 1, UOM: UOMs.pcs, MainType: AssetMainTypes.Crew,
  // ProductionCost: [],
  // MaterialsConsumed: [
  //   { Name: MaterialNames.Cash, Quantity: 2000 },
  //   { Name: MaterialNames.Food, Quantity: 2 },
  //   { Name: MaterialNames.DeskArea, Quantity: 0 }],
  // MaterialsProduced: [{ Name: MaterialNames.BasicWorkUnit, Quantity: 4 }],
  // Quantity: 100


}
