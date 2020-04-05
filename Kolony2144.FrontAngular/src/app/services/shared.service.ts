import { Injectable } from '@angular/core';
import { IAsset, ISimpleAsset, IWikiEntity } from '../models/Entity';
import { AllBuildings } from '../models/Building';
import { AllCivilianCrew } from '../models/Crew';
import { AllInventoryItems } from '../models/InventoryItem';
import { AllMachines } from '../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  allWikiEntites: IWikiEntity[] = [];

  constructor() {
    this.prepareWikiInitialData();
  }

  prepareWikiInitialData() {
    [...AllInventoryItems, ...AllCivilianCrew, ...AllBuildings, ...AllMachines].forEach(i => {
      this.allWikiEntites.push({
        Name: i.Name,
        Description: i.Description,
        ImageUrl: i.ImageUrl,
        Size: i.Size,
        Type: i.Type,
        ProductionCost: i.ProductionCost,
        ConsumedItems: i.ConsumedItems,
        ProducedItems: i.ProducedItems,
        UoM: i.UoM,
      })
    });
  }

  getAssetFromListByName(list: IAsset[], name: string) {
    return list.find(i => i.Name === name);
  }

  getUoM(item: ISimpleAsset) {
    return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
  }

  getRandomFromRange(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomValueFromEnum(list: string[]): string {
    let count = list.length;
    let n = Math.round(Math.random() * count);
    return list[n];
  }
}
