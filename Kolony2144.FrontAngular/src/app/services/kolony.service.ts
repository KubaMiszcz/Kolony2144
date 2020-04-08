import { Injectable } from '@angular/core';
import { IKolony, Kolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, ISimplifiedResource } from '../models/Entity';
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
          CreationCost: i.CreationCost,
          MaintenanceCost: i.MaintenanceCost,
          PassiveIncome: i.PassiveIncome,
          UoM: i.UoM,
          Quantity: i.InitialQuantity
        })
      });

    return res;
  }


  updateInventoryDueToMaintenance() {
    this.kolony.Assets.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        this.kolony.Assets.find(a => a.Name == consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToProducingItems() {
    this.kolony.Assets.forEach(asset => {
      asset.PassiveIncome.forEach(producedItem => {
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
    return this.getMonthlyAssetProductionByName(ResourceName.Energy)
  }

  get GetEnergyUsage(): number {
    return this.getMonthlyAssetConsumptionByName(ResourceName.Energy)
  }

  getAllCrewQuantity() {
    return this.getKolonyAssetsByType(AssetTypesEnum.Crew)
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getMonthlyAssetConsumption(cosnumedAsset: IAsset): number {
    let consumedQty = 0;
    this.kolony.Assets.forEach(asset => {
      let consumedItem = asset.MaintenanceCost.find(item => item.Name === cosnumedAsset.Name);
      if (consumedItem) {
        consumedQty += (asset.Quantity * consumedItem.Quantity);
      }
    });
    return consumedQty;
  };

  getMonthlyAssetConsumptionByName(assetName: ResourceName): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(assetName));
  };


  getMonthlyAssetProduction(producedAsset: IAsset): number {
    let producedQty = 0;
    this.kolony.Assets.forEach(asset => {
      let producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });
    return producedQty;
  };

  getMonthlyAssetProductionByName(assetName: ResourceName): number {
    return this.getMonthlyAssetProduction(this.getKolonyAssetByName(assetName));
  };

  getAssetListByConsumedAsset(consumedAsset: IAsset): IAsset[] {
    return this.getAssetsListByConsumedAssetName(consumedAsset.Name as ResourceName);
  };

  getAssetsListByConsumedAssetName(consumedAssetName: ResourceName): IAsset[] {
    let res = [];
    this.kolony.Assets.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });
    return res;
  };

  findResourceInAssetByName(resourcesList: ISimplifiedResource[], name: ResourceName) {
    return resourcesList.find(r => r.Name === name);
  }

  findAssetInListByName(resourcesList: IAsset[], name: string) {
    return resourcesList.find(i => i.Name === name);
  }

  getAssetQuantityFromListByName(assetsList: ISimplifiedResource[], name: string) {
    const asset = assetsList.find(s => s.Name === name);
    return !!asset ? asset.Quantity : 0;
  };

  getUoMByName(item: ISimplifiedResource) {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');
    return 'fixit';
  }


}

































