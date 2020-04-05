import { IAsset } from '../../models/Entity';
import { StarterInventoryItems, InventoryItemsNames } from '../../models/InventoryItem';
import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { IKolony } from 'src/app/models/Kolony';

@Component({
  selector: 'app-crew',
  templateUrl: './crew.component.html',
  styleUrls: ['./crew.component.scss']
})
export class CrewComponent implements OnInit {
  kolony: IKolony;

  tableHeaders: string[];
  crewList: any[] = [];
  tableFooters: string[];
  showTotal = true;

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {
    let totals;

    this.crewList.push([
      'Name',
      'Salary per Unit',
      InventoryItemsNames.Food + ' Consumption per Unit',
      InventoryItemsNames.BasicWorkUnit + ' Production per Unit',
      InventoryItemsNames.AdvancedWorkUnit + ' Production per Unit',
      InventoryItemsNames.SciencePack + ' Production per Unit',
      'Qty',
      'Salary',
      'Total ' + InventoryItemsNames.Food + ' Consumption',
      'Total ' + InventoryItemsNames.BasicWorkUnit + ' Production',
      'Total ' + InventoryItemsNames.AdvancedWorkUnit + ' Production',
      'Total ' + InventoryItemsNames.SciencePack + ' Production'
    ]);

    this.kolony.Crew.forEach(c => {
      let name = c.Name;
      let salary = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Cash);
      let foodConsumption = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Food);
      let BasicWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, InventoryItemsNames.BasicWorkUnit);
      let AdvWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, InventoryItemsNames.AdvancedWorkUnit);
      let ScienceWU = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, InventoryItemsNames.SciencePack);
      let qty = c.Quantity;
      this.crewList.push([
        name,
        salary,
        foodConsumption,
        BasicWU,
        AdvWU,
        ScienceWU,
        qty,
        salary * qty,
        foodConsumption * qty,
        BasicWU * qty,
        AdvWU * qty,
        ScienceWU * qty
      ]);
    });

    totals = this.sharedService.getTotalsForTable(this.crewList.slice(1));
    this.crewList.push([...(new Array(5)), 'Total:', ...totals.slice(6)]);
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
