import { IEntity, ITradeableEntity, IWikiEntity, IAsset } from './Entity';
import { AssetTypesEnum, CrewTypesEnum, GenericTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

export enum CrewNames {
  Worker = 'Worker',
  Technician = 'Technician'
}

export interface ICrew extends IAsset {
}

export interface ICrewFullModel extends ICrew, IWikiEntity, ITradeableEntity {
}


export const AllCrew: ICrewFullModel[] = [
  {
    Name: CrewNames.Worker,
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/wiki-icons/crew-worker.png',
    Type: AssetTypesEnum.Crew,
    Tags: [CrewTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 50,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.Food, Quantity: 0.2 },
      { Name: ResourceName.Cash, Quantity: 1 },
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 2 },
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 20
  },
  {
    Name: CrewNames.Technician,
    Description: '', ImageUrl: '/assets/wiki-icons/crew-technician.png',

    Type: AssetTypesEnum.Crew,
    Tags: [CrewTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 100,
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
    Quantity: 5
  }
];







