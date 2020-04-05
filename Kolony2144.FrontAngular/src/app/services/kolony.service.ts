import { Injectable } from '@angular/core';
import { IKolony, Kolony } from '../models/Kolony';
import { AllResources, ResourceNames } from '../models/Resource';
import { IAsset } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { AssetTypesEnum, VolatileResourceTypesEnum } from '../models/enums/Types.enum';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  ClearVolatileResources() {
    // let list= VolatileResourceTypesEnum.

  }

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
      .filter(a => a.InitialQuantity > 0)
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
    console.log(res);

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


  getAllCrewQuantity() {
    this.kolony.Crew
    // let res = 0;
    // this.kolony.Assets.filter(a => a.Type === TypesEnum.Crew).forEach(crew => qty += crew.Quantity);
    // return res;
    return this.kolony.Crew
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getMonthlyFoodConsumption(): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(ResourceNames.Food));
  };

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

}

































