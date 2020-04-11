import { IFullEntity, IAsset } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { ResourceName } from "./Resource";
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
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/wiki-icons/crew-worker.png',
    Size: 1,
    Type: AssetTypesEnum.Crew,
    SubType: CrewTypesEnum.Production,
    InitialPrice: 50,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.Food, Quantity: 0.2 },
      { Name: ResourceName.Cash, Quantity: 1 },
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 2 },
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 20
  },
  {
    Name: CrewNames.Technician,
    Description: '', ImageUrl: '/assets/wiki-icons/crew-technician.png',
    Size: 1,
    Type: AssetTypesEnum.Crew,
    SubType: CrewTypesEnum.Production,
    InitialPrice: 100,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.Food, Quantity: 0.1 },
      { Name: ResourceName.Cash, Quantity: 2 },
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 1 },
      { Name: ResourceName.AdvancedWorkUnit, Quantity: 1 },
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 5
  }
]













