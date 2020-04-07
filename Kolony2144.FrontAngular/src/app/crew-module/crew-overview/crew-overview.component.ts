import { Component, OnInit } from '@angular/core';
import { IAsset } from 'src/app/models/Entity';
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

  header: any[] = [];
  crewList: any[][] = [];
  footer: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit() {
    // let totals;

    this.header = [
      'Name',
      // 'Salary per Unit',
      // ResourceNames.Food + ' Consumption per Unit',
      // ResourceNames.WorkUnit + ' Production per Unit',
      'Total Qty'
      // 'Salary',
      // 'Total ' + ResourceNames.Food + ' Consumption',
      // 'Total ' + ResourceNames.WorkUnit + ' Production',
    ];

    this.kolonyService.getKolonyAssetsByType(AssetTypesEnum.Crew).forEach(c => {
      let name = c.Name;
      // let salary = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, ResourceNames.Cash);
      // let foodConsumption = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, ResourceNames.Food);
      // let BasicWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, ResourceNames.BasicWorkUnit);
      // let AdvWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, ResourceNames.AdvancedWorkUnit);
      // let ScienceWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, ResourceNames.SciencePack);
      let qty = c.Quantity;
      this.crewList.push([
        name,
        // salary,
        // foodConsumption,
        // BasicWU,
        // AdvWU,
        // ScienceWU,
        qty
        // salary * qty,
        // foodConsumption * qty,
        // BasicWU * qty,
        // AdvWU * qty,
        // ScienceWU * qty
      ]);
    });

    this.footer = this.header;

    // totals = this.sharedService.getTotalsForTable(this.crewList.slice(1));
    // this.crewList.push([...(new Array(5)), 'Total:', ...totals.slice(6)]);
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
