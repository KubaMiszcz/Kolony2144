import { Injectable } from '@angular/core';
import { IAsset, ISimplifiedResource, IWikiEntity } from '../models/Entity';
import { AllBuildings } from '../models/Building';
import { AllCivilianCrew } from '../models/Crew';
import { AllResources } from '../models/Resource';
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
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines].forEach(i => {
      this.allWikiEntites.push({
        Name: i.Name,
        Description: i.Description,
        ImageUrl: i.ImageUrl,
        Size: i.Size,
        Type: i.Type,
        SubType: i.SubType,
        CreationCost: i.CreationCost,
        MaintenanceCost: i.MaintenanceCost,
        PassiveIncome: i.PassiveIncome,
        UoM: i.UoM,
      })
    });
  }

  getRandomFromRange(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomValueFromEnum(list: string[]): string {
    let count = list.length;
    let n = Math.round(Math.random() * count);
    return list[n];
  }

  sumColumnOftable(table: any[][], colNo: number) {
    return table.map(c => c[colNo])
      .reduce((total, i) => total + i);
  }

}
