import { IFullEntity, IAsset } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { ResourceNames } from "./Resource";
import { AssetTypesEnum, CrewTypesEnum, BuildingTypesEnum } from "./enums/Types.enum";

export enum CrewNames {
  Worker = 'Worker',
  Technician = 'Technician'
}

export interface ICrewFullEntity extends IFullEntity {
  // SubType: CrewTypesEnum;
}


export const AllCivilianCrew: IFullEntity[] = [
  {
    Name: CrewNames.Worker,
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/worker.png',
    Size: 1,
    Type: AssetTypesEnum.Crew,
    SubType: CrewTypesEnum.Production,
    CreationCost: [],
    ConsumedItems: [
      { Name: ResourceNames.Food, Quantity: 0.2 },
      { Name: ResourceNames.Cash, Quantity: 1 },
    ],
    ProducedItems: [
      { Name: ResourceNames.BasicWorkUnit, Quantity: 2 },
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 20
  },
  {
    Name: CrewNames.Technician,
    Description: '', ImageUrl: '/assets/worker.png',
    Size: 1,
    Type: AssetTypesEnum.Crew,
    SubType: CrewTypesEnum.Production,
    CreationCost: [],
    ConsumedItems: [
      { Name: ResourceNames.Food, Quantity: 0.1 },
      { Name: ResourceNames.Cash, Quantity: 2 },
    ],
    ProducedItems: [
      { Name: ResourceNames.BasicWorkUnit, Quantity: 1 },
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 5
  }
]













