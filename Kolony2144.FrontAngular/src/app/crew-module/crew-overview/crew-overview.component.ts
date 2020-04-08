import { Component, OnInit } from '@angular/core';
import { IKolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResourceNames } from 'src/app/models/Resource';
import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-crew-overview',
  templateUrl: './crew-overview.component.html',
  styleUrls: ['./crew-overview.component.scss']
})
export class CrewOverviewComponent implements OnInit {
  kolony: IKolony;

  perUnitHeader: any[] = [];
  perUnitList: any[][] = [];
  perUnitFooter: any[] = [];
  totalHeader: any[] = [];
  totalList: any[][] = [];
  totalFooter: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit() {
    this.setPerUnitSummary();
    this.setTotalSummary();
  }

  setPerUnitSummary() {
    this.perUnitHeader = [
      'Name',
      'Salary per Unit',
      ResourceNames.Food + ' Consumption per Unit',
      ResourceNames.BasicWorkUnit + ' Production per Unit',
      'Total Qty',
    ];

    this.kolonyService.getKolonyAssetsByType(AssetTypesEnum.Crew).forEach(c => {
      let name = c.Name;
      let salary = this.sharedService.getAssetQuantityFromListByName(c.MaintenanceCost, ResourceNames.Cash);
      let foodConsumption = this.sharedService.getAssetQuantityFromListByName(c.MaintenanceCost, ResourceNames.Food);
      let BasicWU = this.sharedService.getAssetQuantityFromListByName(c.PassiveIncome, ResourceNames.BasicWorkUnit);
      let qty = c.Quantity;
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

  setTotalSummary() {
    this.totalHeader = [
      'Name',
      'Total Qty',
      'Total Salary',
      'Total ' + ResourceNames.Food + ' Consumption',
      'Total ' + ResourceNames.BasicWorkUnit + ' Production',
    ];

    this.kolonyService.getKolonyAssetsByType(AssetTypesEnum.Crew).forEach(c => {
      let name = c.Name;
      let salary = this.sharedService.getAssetQuantityFromListByName(c.MaintenanceCost, ResourceNames.Cash);
      let foodConsumption = this.sharedService.getAssetQuantityFromListByName(c.MaintenanceCost, ResourceNames.Food);
      let BasicWU = this.sharedService.getAssetQuantityFromListByName(c.PassiveIncome, ResourceNames.BasicWorkUnit);
      let qty = c.Quantity;
      this.totalList.push([
        name,
        qty,
        salary * qty,
        foodConsumption * qty,
        BasicWU * qty,
      ]);
    });

    this.totalFooter = [
      'Total:',
      this.sharedService.sumColumnOftable(this.totalList, 1),
      this.sharedService.sumColumnOftable(this.totalList, 2),
      this.sharedService.sumColumnOftable(this.totalList, 3),
      this.sharedService.sumColumnOftable(this.totalList, 4),
    ]
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
