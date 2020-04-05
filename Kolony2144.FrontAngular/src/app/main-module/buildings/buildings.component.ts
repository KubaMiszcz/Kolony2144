import { AssetMainTypes } from './../../models/enums/Types.enum';
import { GameService } from './../../services/game.service';
import { StarterBuildings } from 'src/app/models/Building';
import { IAsset } from '../../models/Entity';
import { IKolony } from './../../models/Kolony';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { InventoryItemsNames } from 'src/app/models/InventoryItem';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-buildings',
  templateUrl: './buildings.component.html',
  styleUrls: ['./buildings.component.scss']
})
export class BuildingsComponent implements OnInit {
  kolony: IKolony;

  productionQueue: IAsset[] = [];

  allConstructionAssets: IAsset[];

  powerFacilitiesList: any[] = [];
  buildingsList: any[] = [];
  showTotal = true;

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService,
    private productionService: ProductionService,
    private gameService: GameService,

  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {
    this.fillPowerFacilitiesSummary(this.powerFacilitiesList);
    this.fillBuildingsSummary(this.buildingsList);

    this.allConstructionAssets = this.gameService.AllAssets.filter(a => a.MainType === AssetMainTypes.Building).sort((a, b) => a.Name.localeCompare(b.Name));
    this.productionService.productionQueueBS.subscribe(q => this.productionQueue = q);
  }

  removeItemFromProductionQueue(item: IAsset) {
    this.productionService.removeItemFromProductionQueue(item);
  }




















  fillBuildingsSummary(list: any[]) {
    let totals = [];
    list.push([
      'Name',
      'Size',
      'Maintenace Cost per Unit',
      InventoryItemsNames.Energy + ' Consumption per Unit',
      'Qty',
      'Total Maintenace Cost',
      InventoryItemsNames.Energy + ' Consumption'
    ]);

    this.kolony.Buildings.forEach(c => {
      let name = c.Name;
      let size = c.Size;
      let maintenaceCost = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Cash)
      let energyConsumption = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Energy)
      let qty = c.Quantity;
      list.push([
        name,
        size,
        maintenaceCost,
        energyConsumption,
        qty,
        maintenaceCost * qty,
        energyConsumption * qty
      ]);
    });

    totals = this.sharedService.getTotalsForTable(list.slice(1));
    list.push([...new Array(4), 'Total:', ...totals.slice(5)]);
  }

  fillPowerFacilitiesSummary(list: any[]) {
    let totals;

    list.push([
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

    this.kolony.PowerFacilities.forEach(c => {
      let name = c.Name;
      let size = c.Size;
      let maintenaceCost = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Cash)
      let energyDrain = this.sharedService.getQuantityByNameOrDefault(c.ConsumedItems, InventoryItemsNames.Energy)
      let energyProduction = this.sharedService.getQuantityByNameOrDefault(c.ProducedItems, InventoryItemsNames.Energy)
      let qty = c.Quantity;
      list.push([
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

    totals = this.sharedService.getTotalsForTable(list.slice(1));
    list.push([...new Array(5), 'Total:', ...totals.slice(6)]);
  }
}
