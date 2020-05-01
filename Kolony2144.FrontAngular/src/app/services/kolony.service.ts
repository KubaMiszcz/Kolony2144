import { Injectable, EventEmitter } from '@angular/core';
import { AllBuildings, IBuilding } from '../models/Building';
import { AllCrew as AllCrew } from '../models/Crew';
import { IAsset, IEntity } from '../models/Entity';
import { GenericTypesEnum, ResourceTypesEnum, EntityTypesEnum } from '../models/enums/Types.enum';
import { IKolony, Kolony } from '../models/Kolony';
import { AllMachines } from '../models/Machine';
import { AllResources, AllVolatileResources } from '../models/Resource';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { DataProviderService } from './data-provider.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  Kolony: Kolony;
  AllAssetsBS = new BehaviorSubject<IAsset[]>([]);
  AllKolonyEntitiesBS = new BehaviorSubject<IEntity[]>([]);
  KolonyStateUpdatedSubject = new Subject<boolean>();

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService
  ) {
    this.InitNewKolony();
  }

  InitNewKolony() {
    this.Kolony = new Kolony();
    this.Kolony.Age = 100;
    this.Kolony.Name = 'KolonyUNO';
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_BUILDINGS_LIST, this.Kolony.Buildings);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_CREW_LIST, this.Kolony.Crew);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_MACHINES_LIST, this.Kolony.Machines);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_RESOURCES_LIST, this.Kolony.Resources);
    this.updateGenericLists();
  }

  private updateGenericLists() {
    this.AllAssetsBS.next([...this.Kolony.Crew, ...this.Kolony.Machines, ...this.Kolony.Resources]);
    this.AllKolonyEntitiesBS.next([...this.Kolony.Buildings, ...this.Kolony.Crew, ...this.Kolony.Machines, ...this.Kolony.Resources]);
    this.KolonyStateUpdatedSubject.next(true);
  }

  createNewAssetInKolony(newAsset: IAsset): IAsset {
    const asset = this.commonService.cloneObject(newAsset) as IAsset;
    asset.Quantity = 0;
    asset.Price = 0;
    if (asset.Type === EntityTypesEnum.Resource) {
      this.Kolony.Resources.push(asset);
    } else if (asset.Type === EntityTypesEnum.Crew) {
      this.Kolony.Crew.push(asset);
    } else if (asset.Type === EntityTypesEnum.Machine) {
      this.Kolony.Machines.push(asset);
    }
    this.updateGenericLists();

    return asset;
  }


  deleteAssetFromKolony(asset: IAsset) {
    let assetList = [];
    if (asset.Type === EntityTypesEnum.Resource) {
      assetList = this.Kolony.Resources;
    } else if (asset.Type === EntityTypesEnum.Crew) {
      assetList = this.Kolony.Crew;
    } else if (asset.Type === EntityTypesEnum.Machine) {
      assetList = this.Kolony.Machines;
    }
    this.sharedService.removeItemFromListByName(assetList, asset.Name);
    this.updateGenericLists();
  }








  getKolonyState(): IKolony {
    return this.Kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }






  private fillKolonyListWithInitialValues<T, T2>(srcList: T[], targetList: T2[]) {
    [...srcList].filter(a =>
      (a as unknown as IEntity).Quantity > 0
      || (a as unknown as IAsset).Price === undefined
    )
      .forEach(item => {
        const clonedItem = this.commonService.cloneObject(item) as unknown as T2;
        targetList.push(clonedItem);
        // res.push(new Asset().Deserialize(i));
      });
    // return res;
  }

}
