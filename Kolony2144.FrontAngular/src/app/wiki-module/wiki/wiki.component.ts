import { DetailedBuildingTypes, DetailedMachineTypes } from './../../models/enums/Types.enum';
import { InventoryItemsMainTypes, AssetMainTypes } from 'src/app/models/enums/Types.enum';
import { StarterCivilianCrew } from './../../models/Crew';
import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/Entity';
import { StarterInventoryItems } from 'src/app/models/InventoryItem';
import { StarterMachines } from 'src/app/models/Machine';
import { StarterBuildings } from 'src/app/models/Building';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {
  propertiesList: IEntity[] = [];
  inventoryItemsList: IEntity[] = [];

  crewList: IEntity[] = [];
  machinesList: IEntity[] = [];
  powersourcesList: IEntity[] = [];

  buildingsList: IEntity[] = [];
  powerFacilitiesList: IEntity[] = [];

  constructor(
  ) {
    this.propertiesList = StarterInventoryItems.filter(i => i.MainType === InventoryItemsMainTypes.Energy);
    this.propertiesList.push(...StarterInventoryItems.filter(i => i.MainType === InventoryItemsMainTypes.Property));

    this.inventoryItemsList = StarterInventoryItems.filter(i => i.MainType === InventoryItemsMainTypes.InventoryItem);

    this.crewList = StarterCivilianCrew;

    this.powersourcesList = StarterMachines.filter(i => i.MainType === AssetMainTypes.Machine && i.DetailedType === DetailedMachineTypes.PowerSource);
    this.machinesList = StarterMachines.filter(i => i.MainType === AssetMainTypes.Machine && !(i.DetailedType === DetailedMachineTypes.PowerSource));

    this.powerFacilitiesList = StarterBuildings.filter(i => i.MainType === AssetMainTypes.Building && i.DetailedType === DetailedBuildingTypes.PowerSource);;
    this.buildingsList = StarterBuildings.filter(i => i.MainType === AssetMainTypes.Building && !(i.DetailedType === DetailedBuildingTypes.PowerSource));
  }

  ngOnInit() {
  }

}
