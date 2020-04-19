import { Injectable } from '@angular/core';
import { AllResources } from '../models/Resource';
import { AllCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { IWikiEntity } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
  allWikiEntites: IWikiEntity[] = [];

  constructor() {
    this.prepareWikiInitialData();
  }

  prepareWikiInitialData() {
    [...AllResources, ...AllCrew, ...AllBuildings, ...AllMachines].forEach(i => {
      const a = new Object() as IWikiEntity;
      Object.assign(a, i);
      this.allWikiEntites.push(a);
      // this.allWikiEntites.push({
      //   Name: i.Name,
      //   Description: i.Description,
      //   ImageUrl: i.ImageUrl,
      //   Size: i.Size,
      //   Type: i.Type,
      //   SubType: i.SubType,
      //   InitialPrice: i.InitialPrice,
      //   CreationCost: i.CreationCost,
      //   MaintenanceCost: i.MaintenanceCost,
      //   PassiveIncome: i.PassiveIncome,
      //   UoM: i.UoM,
      //   Quantity: 0
      // });
    });
  }
}
