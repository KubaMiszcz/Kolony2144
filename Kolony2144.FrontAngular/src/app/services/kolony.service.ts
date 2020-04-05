import { MachinesNames, StarterMachines } from './../models/Machine';
import { IEntity, IAsset, IInventoryItemShort, IInventoryItem } from '../models/Entity';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { SharedService } from './shared.service';
import { IKolony, Kolony } from '../models/Kolony';
import { BuildingNames, StarterBuildings } from '../models/Building';
import { CrewNames, StarterCivilianCrew } from '../models/Crew';
import { InventoryItemsMainTypes, ProcessingPhasesNames, DetailedMachineTypes } from '../models/enums/Types.enum';
import { StarterInventoryItems } from '../models/InventoryItem';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {


  private get kolony() { return this.KolonyBS.value; }
  private set kolony(value: IKolony) { this.KolonyBS.next(value); }
  KolonyBS = new BehaviorSubject<IKolony>(null);

  constructor(
    private sharedService: SharedService
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Age = 100;
    kolony.AllInventoryItemsArray = JSON.parse(JSON.stringify(StarterInventoryItems));
    kolony.AllAssetsArray = JSON.parse(JSON.stringify([...StarterCivilianCrew, ...StarterMachines, ...StarterBuildings]));

    kolony.Robots.forEach(m => m.Quantity = 0);

    this.kolony = kolony;

    //this.powerService     = new PowerService(this.kolony);
    // this.materialService = new MaterialService(this.kolony);
  }


































  zeroingVolatileProperties(allMaterialsArray: IInventoryItem[]) {
    let lst = allMaterialsArray.filter(m => (m.MainType === InventoryItemsMainTypes.Energy) || (m.MainType === InventoryItemsMainTypes.Property));
    lst.forEach(m => m.Quantity = 0);
  }


  updateStockQuantityForAssetsList(assetsList: IAsset[], processingPhase: ProcessingPhasesNames) {
    let factor = processingPhase === ProcessingPhasesNames.Production ? 1 : -1;

    assetsList.forEach(asset => {
      let itemsProcessed = factor === 1 ? asset.ProducedItems : asset.ConsumedItems;
      itemsProcessed.forEach(item => {
        let previtem = this.findInventoryItemFromAllByName(item.Name);
        let prevQty = previtem.Quantity;
        this.findInventoryItemFromAllByName(item.Name).Quantity += (factor * item.Quantity * asset.Quantity);
      });
    })
  }





















  getProducedMaterials(entityList: IAsset[], entityName: string, warehouseList: IAsset[]) {
    let entity = entityList.find(c => c.Name === entityName);
    entity.ProducedItems.forEach(p => {
      let material = warehouseList.find(m => m.Name === p.Name);
      material.Quantity += (entity.Quantity * p.Quantity);
    })
    console.log('getProducedMaterials', entityName, this.kolony);
  }




  getCrewWorkUnits(crewName: CrewNames) {
    let crew = this.kolony.Crew.find(c => c.Name === crewName);
    crew.ProducedItems.forEach(p => {
      let material = this.kolony.InventoryItems.find(m => m.Name === p.Name);
      material.Quantity += (crew.Quantity * p.Quantity);
    })
    console.log('getCrewWorkUniwts', crewName, this.kolony);
  }

  getTechniciansWorkUnits() {
    let crew = this.kolony.Crew.find(c => c.Name === CrewNames.Technician);
    crew.ProducedItems.forEach(p => {
      let material = this.kolony.InventoryItems.find(m => m.Name === p.Name);
      material.Quantity += (crew.Quantity * p.Quantity);
    })
    console.log('getEngineerWorkUnits', this.kolony);
  }

  getEngineerWorkUnits() {
    // this.sharedService.getAssetFromListByName(this.kolony.Crew, CrewNames.Engineer);
    let crew = this.kolony.Crew.find(c => c.Name === CrewNames.Engineer);
    crew.ProducedItems.forEach(p => {
      // this.getInventoryItemFromAllByName(p.Name).Quantity+=(crew.Quantity * p.Quantity);
      let material = this.kolony.InventoryItems.find(m => m.Name === p.Name);
      material.Quantity += (crew.Quantity * p.Quantity);
    })
    console.log('getEngineerWorkUnits', this.kolony);
  }














  findInventoryItemFromAllByName(name: string) {
    return this.kolony.AllInventoryItemsArray.find(i => i.Name === name);
  }

  findAssetFromAllByName(name: string) {
    return this.kolony.AllAssetsArray.find(i => i.Name === name);
  }















  // updatePowerStatus() {
  //   this.powerService.refreshTotalPowerConsumption();
  //   this.powerService.refreshTotalPowerProduction();
  // }

  // updateMaterialStock() {
  //   this.materialService.refreshUraniumStock();
  // }






  // getTotalBuildingsCost(): number {
  //   let total = 0;
  //   this.kolony.Buildings.forEach(c => total += c.Quantity * c.MaintenanceCost);
  //   return total;
  // }

  // getTotalCrewCost(): number {
  //   let total = 0;
  //   this.kolony.Crew.forEach(c => total += c.Quantity * c.Salary);
  //   return total;
  // }
  // getTotalKolonyCost(): number {
  //   return this.getTotalCrewCost() + this.getTotalBuildingsCost();
  // }

  // updateFinances() {
  //   this.KolonyBS.value.Cash -= this.getTotalKolonyCost();
  // }


































}
