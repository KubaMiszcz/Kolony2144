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

@Injectable({
  providedIn: 'root'
})
export class KolonyService {

  Kolony: Kolony;
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

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.InitNewKolony();
  }

  getAllKolonyEntities(): IEntity[] {
    return [
      ...this.Kolony.Buildings,
      ...this.Kolony.Crew,
      ...this.Kolony.Machines,
      ...this.Kolony.Resources
    ];
  }


  getKolonyState(): IKolony {
    return this.Kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }

  //#region init new kolony
  InitNewKolony() {
    this.Kolony = new Kolony();
    this.Kolony.Age = 100;
    this.Kolony.Name = 'KolonyUNO';
    // this.Kolony.Buildings = this.fillInitialKolonyBuildings();
    this.fillKolonyListWithInitialValues(AllBuildings, this.Kolony.Buildings);
    this.fillKolonyListWithInitialValues(AllCrew, this.Kolony.Crew);
    this.fillKolonyListWithInitialValues(AllMachines, this.Kolony.Machines);
    this.fillKolonyListWithInitialValues(AllResources, this.Kolony.Resources);
    this.fillKolonyListWithInitialValues(AllVolatileResources, this.Kolony.Resources);
  }

  fillKolonyListWithInitialValues<T, T2>(srcList: T[], targetList: T2[]) {
    [...srcList].filter(a =>
      (a as unknown as IEntity).Quantity > 0
      || (a as unknown as IEntity).Tags.includes(ResourceTypesEnum.Volatile)
    )
      .forEach(i => {
        targetList.push(i as unknown as T2);
        // res.push(new Asset().Deserialize(i));
      });
    // return res;
  }

}
