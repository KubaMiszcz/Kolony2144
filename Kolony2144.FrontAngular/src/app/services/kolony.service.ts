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
  private kolony: Kolony;
  // get kolony(): IKolony { return this.kolonyBS.value };
  // kolonyBS = new BehaviorSubject<IKolony>(null);

  constructor(
    private sharedService: SharedService,
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Age = 100;
    kolony.Assets = this.prepareInitialAssets();
    this.kolony = kolony;

  }

  getName(): string { return this.kolony.Name; }
  getAge(): number { return this.kolony.Age; }
  getAllAssets(): IAsset[] { return this.kolony.Assets }


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

  setNextMonth() {
    this.kolony.Age += 0.1;
  }

  getUoMByName(itemName: string) {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');
    return 'fixit';
  }


}

































