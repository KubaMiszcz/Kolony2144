import { Injectable } from '@angular/core';
import { IEntity, IAsset } from '../models/Entity';
import { IBuilding, AllBuildings } from '../models/Building';
import { AllResources } from '../models/Resource';
import { AllCrew } from '../models/Crew';
import { AllMachines } from '../models/Machine';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { GenericTypesEnum } from '../models/enums/Types.enum';
import { IKolony } from '../models/Kolony';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  KOLONY: IKolony;

  ALL_ENTITIES_LIST: IEntity[] = [];
  ALL_ASSETS_LIST: IAsset[] = [];
  ALL_TRADEABLE_ASSETS_LIST: IAsset[] = [];
  ALL_BUILDINGS_LIST: IBuilding[] = [];

  PlayerNotes = '';


  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.fillAllInitialGameBuildings();
    this.fillAllInitialGameAssets();
    this.fillAllInitialGameEntities();

    this.fillAllTradeableAssets();

    this.fillDataFromSavedState();
  }

  getEntityByName(name: string): IEntity {
    return this.sharedService.findItemInListByName(this.ALL_ENTITIES_LIST, name);
  }


  fillAllTradeableAssets() { // todo change it to interface tradebale asset
    this.ALL_TRADEABLE_ASSETS_LIST = this.commonService.cloneObject<IAsset[]>(this.ALL_ASSETS_LIST)
      .filter(a => a.Tags.includes(GenericTypesEnum.Tradeable));
  }

  fillDataFromSavedState() {
    this.PlayerNotes = sessionStorage.getItem('savedState');
  }

  // getAssetByName(name: string): IAsset {
  //   return this.sharedService.findItemInListByName(this.ALL_ASSETS_LIST, name);
  // }










  fillAllInitialGameAssets() {
    [...AllResources, ...AllCrew, ...AllMachines].forEach(i => {
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
      this.ALL_ENTITIES_LIST.push(i as IEntity);
    });
  }
}


interface IGameState {
  Age: number;
  playerNotes: string;
  kolony: IKolony;
}
