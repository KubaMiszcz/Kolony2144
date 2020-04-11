import { Injectable } from '@angular/core';
import { IWikiEntity } from '../models/Entity';
import { AllResources } from '../models/Resource';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';

@Injectable({
  providedIn: 'root'
})
export class WikiService {
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
        InitialPrice: i.InitialPrice,
        CreationCost: i.CreationCost,
        MaintenanceCost: i.MaintenanceCost,
        PassiveIncome: i.PassiveIncome,
        UoM: i.UoM,
      })
    });
  }
}
