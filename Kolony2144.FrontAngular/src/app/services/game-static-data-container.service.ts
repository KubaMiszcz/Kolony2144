import { Injectable } from '@angular/core';
import { ICountableEntity, IAsset } from '../models/Entity';
import { IBuilding, AllBuildings } from '../models/Building';
import { AllResources } from '../models/Resource';
import { AllCivilianCrew } from '../models/Crew';
import { AllMachines } from '../models/Machine';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class GameStaticDataContainerService {
  ALL_ENTITIES_LIST: ICountableEntity[] = [];
  ALL_ASSETS_LIST: IAsset[] = [];
  ALL_BUILDINGS_LIST: IBuilding[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.fillAllInitialGameBuildings();
    this.fillAllInitialGameAssets();
    this.fillAllInitialGameEntities();
  }

  getEntityByName(name: string): ICountableEntity {
    return this.sharedService.findItemInListByName(this.ALL_ENTITIES_LIST, name);
  }

  // getAssetByName(name: string): IAsset {
  //   return this.sharedService.findItemInListByName(this.ALL_ASSETS_LIST, name);
  // }










  fillAllInitialGameAssets() {
    [...AllResources, ...AllCivilianCrew, ...AllMachines].forEach(i => {
      this.ALL_ASSETS_LIST.push(i as IAsset);
    });
  }

  fillAllInitialGameBuildings() {
    [...AllBuildings].forEach(i => {
      this.ALL_BUILDINGS_LIST.push(i as IAsset);
    });
  }

  fillAllInitialGameEntities() {
    [...this.ALL_BUILDINGS_LIST, ...this.ALL_ASSETS_LIST].forEach(i => {
      this.ALL_ENTITIES_LIST.push(i as ICountableEntity);
    });
  }
}
