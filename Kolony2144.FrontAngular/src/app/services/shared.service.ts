import { Injectable } from '@angular/core';
import { IAsset, ISimpleAsset, IWikiEntity } from '../models/Entity';
import { AllBuildings } from '../models/Building';
import { AllCivilianCrew } from '../models/Crew';
import { AllResources } from '../models/Resource';
import { AllMachines } from '../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  sumColumnOftable(list: any[][], colNo: number) {
    return list.map(c => c[colNo]).reduce((total, i) => total + i);
  }


  getTotalsForTable(list: any[][]) {

    // getTotalsForTable(table: any[]) {
    //   let colNo = table[0].length;
    //   let totals = [];
    //   for (let index = 0; index < colNo; index++) {
    //     totals.push(this.getTotalForColumn(table, index));
    //   }
    //   return totals;
    // }
  }

  allWikiEntites: IWikiEntity[] = [];

  constructor() {
    this.prepareWikiInitialData();
  }

  prepareWikiInitialData() {
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines].forEach(i => {
      this.allWikiEntites.push({
        Name: i.Name,
        Description: i.Description,
        ImageUrl: i.ImageUrl,
        Size: i.Size,
        Type: i.Type,
        SubType: i.SubType,
        CreationCost: i.CreationCost,
        ConsumedItems: i.ConsumedItems,
        ProducedItems: i.ProducedItems,
        UoM: i.UoM,
      })
    });
  }

  // getAssetFromListByName(list: IAsset[], name: string) {
  //   return list.find(i => i.Name === name);
  // }

  getAssetQuantityFromListByName(assetsList: ISimpleAsset[], name: string) {
    const asset = assetsList.find(s => s.Name === name);
    return !!asset ? asset.Quantity : 0;
  };

  getUoMForSimpleAsset(item: ISimpleAsset) {
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
