import { Injectable } from '@angular/core';
import { AllBuildings, IBuilding } from '../models/Building';
import { AllCrew as AllCrew } from '../models/Crew';
import { IAsset, IEntity } from '../models/Entity';
import { GenericTypesEnum, ResourceTypesEnum } from '../models/enums/Types.enum';
import { IKolony, Kolony } from '../models/Kolony';
import { AllMachines } from '../models/Machine';
import { AllResources, AllVolatileResources } from '../models/Resource';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  Kolony: Kolony;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService
  ) {
    this.InitNewKolony();
  }

  get AllAssets(): IAsset[] {
    return [
      ...this.Kolony.Crew,
      ...this.Kolony.Machines,
      ...this.Kolony.Resources
    ];
  }

  get AllKolonyEntities(): IEntity[] {
    return [
      ...this.Kolony.Buildings,
      ...this.Kolony.Crew,
      ...this.Kolony.Machines,
      ...this.Kolony.Resources
    ];
  }

  InitNewKolony() {
    this.Kolony = new Kolony();
    this.Kolony.Age = 100;
    this.Kolony.Name = 'KolonyUNO';
    // this.Kolony.Buildings = this.fillInitialKolonyBuildings();
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_BUILDINGS_LIST, this.Kolony.Buildings);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_CREW_LIST, this.Kolony.Crew);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_MACHINES_LIST, this.Kolony.Machines);
    this.fillKolonyListWithInitialValues(this.dataProviderService.ALL_RESOURCES_LIST, this.Kolony.Resources);
  }

  fillKolonyListWithInitialValues<T, T2>(srcList: T[], targetList: T2[]) {
    [...srcList].filter(a =>
      (a as unknown as IEntity).Quantity > 0
      || (a as unknown as IAsset).Price === undefined
    )
      .forEach(i => {
        targetList.push(i as unknown as T2);
        // res.push(new Asset().Deserialize(i));
      });
    // return res;
  }

  getKolonyState(): IKolony {
    return this.Kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }

}
