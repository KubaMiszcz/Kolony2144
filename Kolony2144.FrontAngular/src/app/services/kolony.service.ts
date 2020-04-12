import { Injectable } from '@angular/core';
import { Kolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, Asset } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  private kolony: Kolony;
  get Name(): string { return this.kolony.Name; }

  constructor(
    private sharedService: SharedService,
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Assets = this.prepareInitialAssets();
    this.kolony = kolony;
  }

  getAllAssets(): IAsset[] { return this.kolony.Assets }


  prepareInitialAssets(): IAsset[] {
    let res: IAsset[] = [];
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines]
      .filter(a => a.Quantity >= 0)
      .forEach(i => {
        let a = new Asset().Deserialize(i);
        a.Quantity = i.Quantity;
        res.push(a);
      });
    return res;
  }

  getUoMByName(itemName: string) {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');
    return 'fixit';
  }


}
