import { Injectable } from '@angular/core';
import { IKolony, Kolony } from '../models/Kolony';
import { AllInventoryItems, InventoryItemsNames } from '../models/InventoryItem';
import { IAsset } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { TypesEnum } from '../models/enums/Types.enum';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {

  kolony: IKolony;
  // get kolony(): IKolony { return this.kolonyBS.value };
  // kolonyBS = new BehaviorSubject<IKolony>(null);

  constructor(
    private sharedService: SharedService,
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Assets = this.prepareInitialAssets();
    kolony.Age = 100;
    kolony.Cash = 1000;
    this.kolony = kolony;
    // this.kolonyBS.next(kolony);

  }

  prepareInitialAssets(): IAsset[] {
    let res = [];
    [...AllInventoryItems, ...AllCivilianCrew, ...AllBuildings, ...AllMachines]
      .filter(a => a.InitialQuantity > 0)
      .forEach(i => {
        res.push({
          Name: i.Name,
          Size: i.Size,
          Type: i.Type,
          ProductionCost: i.ProductionCost,
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

  getKolonyAssetsByType(type: TypesEnum): IAsset[] {
    return this.kolony.Assets.filter(i => i.Type === type);
  }


  getAllCrewQuantity() {
    // let res = 0;
    // this.kolony.Assets.filter(a => a.Type === TypesEnum.Crew).forEach(crew => qty += crew.Quantity);
    // return res;
    return this.getKolonyAssetsByType(TypesEnum.Crew).filter(a => a.Type === TypesEnum.Crew)
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getMonthlyFoodConsumption(): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(InventoryItemsNames.Food));
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

  getMonthlyAssetConsumptionByName(assetName: InventoryItemsNames): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(assetName));
  };

}

































