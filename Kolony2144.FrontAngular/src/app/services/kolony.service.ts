import { Injectable } from '@angular/core';
import { IKolony, Kolony } from '../models/Kolony';
import { AllResources, ResourceNames } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { AssetTypesEnum, ResourceTypesEnum } from '../models/enums/Types.enum';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  kolony: Kolony;
  // get kolony(): IKolony { return this.kolonyBS.value };
  // kolonyBS = new BehaviorSubject<IKolony>(null);

  constructor(
    private sharedService: SharedService,
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Assets = this.prepareInitialAssets();
    kolony.Age = 100;
    this.kolony = kolony;
    // this.kolonyBS.next(kolony);

  }

  prepareInitialAssets(): IAsset[] {
    let res = [];
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines]
      .filter(a => a.InitialQuantity >= 0)
      .forEach(i => {
        res.push({
          Name: i.Name,
          Size: i.Size,
          Type: i.Type,
          SubType: i.SubType,
          ProductionCost: i.CreationCost,
          ConsumedItems: i.ConsumedItems,
          ProducedItems: i.ProducedItems,
          UoM: i.UoM,
          Quantity: i.InitialQuantity
        })
      });

    return res;
  }


  updateInventoryDueToConsumingItems() {
    this.kolony.Assets.forEach(asset => {
      asset.ConsumedItems.forEach(consumedItem => {
        this.kolony.Assets.find(a => a.Name == consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToProducingItems() {
    this.kolony.Assets.forEach(asset => {
      asset.ProducedItems.forEach(producedItem => {
        this.kolony.Assets.find(a => a.Name == producedItem.Name).Quantity += (producedItem.Quantity * asset.Quantity);
      });
    });
  }


  getKolonyAssetByName(name: string): IAsset {
    return this.kolony.Assets.find(i => i.Name === name);
  }

  getKolonyAssetsByType(type: AssetTypesEnum): IAsset[] {
    return this.kolony.Assets.filter(i => i.Type === type);
  }

  getKolonyVolatileAssets(): IAsset[] {
    return this.kolony.Assets.filter(i => i.SubType === ResourceTypesEnum.Volatile);
  }

  ClearVolatileResources() {
    this.getKolonyVolatileAssets().forEach(element => element.Quantity = 0);
  }

  get GetEnergyProduction(): number {
    return this.getMonthlyAssetProductionByName(ResourceNames.Energy)
  }

  get GetEnergyUsage(): number {
    return this.getMonthlyAssetConsumptionByName(ResourceNames.Energy)
  }

  getAllCrewQuantity() {
    return this.getKolonyAssetsByType(AssetTypesEnum.Crew)
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getMonthlyAssetConsumption(cosnumedAsset: IAsset): number {
    let consumedQty = 0;
    this.kolony.Assets.forEach(asset => {
      let consumedItem = asset.ConsumedItems.find(item => item.Name === cosnumedAsset.Name);
      if (consumedItem) {
        consumedQty += (asset.Quantity * consumedItem.Quantity);
      }
    });
    return consumedQty;
  };

  getMonthlyAssetConsumptionByName(assetName: ResourceNames): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(assetName));
  };


  getMonthlyAssetProduction(producedAsset: IAsset): number {
    let producedQty = 0;
    this.kolony.Assets.forEach(asset => {
      let producedItem = asset.ProducedItems.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });
    return producedQty;
  };

  getMonthlyAssetProductionByName(assetName: ResourceNames): number {
    return this.getMonthlyAssetProduction(this.getKolonyAssetByName(assetName));
  };

}

































