import { Injectable } from '@angular/core';
import { IEntity, IAsset } from '../models/Entity';
import { IBuilding, AllBuildings } from '../models/Building';
import { AllResources, IResource, AllVolatileResources } from '../models/Resource';
import { AllCrew, ICrew } from '../models/Crew';
import { AllMachines, IMachine } from '../models/Machine';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { GenericTypesEnum } from '../models/enums/Types.enum';
import { IKolony } from '../models/Kolony';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {
  KOLONY: IKolony;

  ALL_BUILDINGS_LIST: IBuilding[] = [];
  ALL_CREW_LIST: ICrew[] = [];
  ALL_MACHINES_LIST: IMachine[] = [];
  ALL_RESOURCES_LIST: IResource[] = [];

  ALL_TRADEABLE_ASSETS_LIST: IAsset[] = [];

  PlayerNotes = '';


  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.fillListWithInitialValues(AllBuildings, this.ALL_BUILDINGS_LIST);
    this.fillListWithInitialValues(AllCrew, this.ALL_CREW_LIST);
    this.fillListWithInitialValues(AllMachines, this.ALL_MACHINES_LIST);
    this.fillListWithInitialValues(AllResources, this.ALL_RESOURCES_LIST);
    this.fillListWithInitialValues(AllVolatileResources, this.ALL_RESOURCES_LIST);

    this.fillAllTradeableAssets();

    this.fillDataFromSavedState();


    // todo add method for auto fill tags like 'power source' etc and get kolony assets from this service not files
  }

  get ALL_ENTITIES_LIST(): IEntity[] {
    return [
      ...this.ALL_BUILDINGS_LIST,
      ...this.ALL_CREW_LIST,
      ...this.ALL_MACHINES_LIST,
      ...this.ALL_RESOURCES_LIST
    ];
  }

  get ALL_ASSETS_LIST(): IAsset[] {
    return [
      ...this.ALL_CREW_LIST,
      ...this.ALL_MACHINES_LIST,
      ...this.ALL_RESOURCES_LIST
    ];
  }

  fillListWithInitialValues<T, T2>(srcList: T[], targetList: T2[]) {
    [...srcList].forEach(i => {
      targetList.push(i as unknown as T2);
      // res.push(new Asset().Deserialize(i));
    });
  }

  getEntityByName(name: string): IEntity {
    return this.sharedService.findItemInListByName(this.ALL_ENTITIES_LIST, name);
  }



  // fix it check it
  fillAllTradeableAssets() { // todo change it to interface tradebale asset
    this.ALL_TRADEABLE_ASSETS_LIST = this.commonService.cloneObject<IAsset[]>(this.ALL_ASSETS_LIST)
      .filter(a => a.Tags.includes(GenericTypesEnum.Tradeable));
  }


  fillDataFromSavedState() {
    this.PlayerNotes = sessionStorage.getItem('savedState');
  }




}


interface IGameState {
  Age: number;
  playerNotes: string;
  kolony: IKolony;
}
