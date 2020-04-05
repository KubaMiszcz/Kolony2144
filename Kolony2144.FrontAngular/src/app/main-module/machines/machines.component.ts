import { IKolony } from '../../models/Kolony';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { InventoryItemsNames } from 'src/app/models/InventoryItem';

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.scss']
})
export class MachinesComponent implements OnInit {
  kolony: IKolony;

  robotsList: any[] = [];
  powerSourcesList: any[] = [];
  showTotal = true;

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {
    let totals;

  //     //POWER SOURCES
  // {
  //   Name: MachinesNames.PowerGenerator,
  //   Description: 'simple power coal powered generator', ImageUrl: '/assets/machine.png',
  //   Size: 10, UOM: UOMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailMachineTypes.PowerSource,
  //   ProductionCost: [
  //     { Name: InventoryItemsNames.SteelBar, Quantity: 1 }],
  //   MaterialsConsumed: [
  //     { Name: InventoryItemsNames.Cash, Quantity: 1000 },
  //     { Name: InventoryItemsNames.Energy, Quantity: 2 },
  //     { Name: InventoryItemsNames.CoalE, Quantity: 100 }],
  //   MaterialsProduced: [
  //     { Name: InventoryItemsNames.Energy, Quantity: 1000 }],
  //   Quantity: 100,
  // },

    this.powerSourcesList.push([
      'Name',
      'Size',
      'Maintenace Cost per Unit',
      InventoryItemsNames.Energy + ' Drain per Unit',
      InventoryItemsNames.Energy + ' Production per Unit',
      'Qty',
      'Total Maintenace Cost',
      'Total ' + InventoryItemsNames.Energy + ' Drain',
      'Total ' + InventoryItemsNames.Energy + ' Production'
    ]);

    this.kolony.PowerSources.forEach(c => {
      let name = c.Name;
      let size = c.Size;
      let maintenaceCost = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Cash)
      let energyDrain = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Energy)
      let energyProduction = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, InventoryItemsNames.Energy)
      let qty = c.Quantity;
      this.powerSourcesList.push([
        name,
        size,
        maintenaceCost,
        energyDrain,
        energyProduction,
        qty,
        maintenaceCost * qty,
        energyDrain * qty,
        energyProduction * qty
      ]);
    });


    totals = this.sharedService.getTotalsForTable(this.powerSourcesList.slice(1));
    this.powerSourcesList.push([...new Array(5), 'Total:', ...totals.slice(6)]);


    totals = [];
    this.robotsList.push([
      'Name',
      'Size',
      'Maintenace Cost per Unit',
      InventoryItemsNames.Energy + ' Consumption per Unit',
      'Qty',
      'Total Maintenace Cost',
      InventoryItemsNames.Energy + ' Consumption'
    ]);

    this.kolony.Robots.forEach(c => {
      let name = c.Name;
      let size = c.Size;
      let maintenaceCost = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Cash)
      let energyConsumption = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Energy)
      let qty = c.Quantity;
      this.robotsList.push([
        name,
        size,
        maintenaceCost,
        energyConsumption,
        qty,
        maintenaceCost * qty,
        energyConsumption * qty
      ]);
    });


    totals = this.sharedService.getTotalsForTable(this.robotsList.slice(1));
    this.robotsList.push([...new Array(4), 'Total:', ...totals.slice(5)]);


  }
}
