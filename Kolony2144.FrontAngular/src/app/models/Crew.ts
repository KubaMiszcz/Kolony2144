import { IEntity, IWikiEntity, IAsset, ITradeableEntity } from './Entity';
import { EntityTypesEnum, CrewTypesEnum, GenericTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

export enum CrewNames {
  Worker = 'Worker',
  Technician = 'Technician',
  Engineer = 'Engineer'
}

export interface ICrew extends IAsset {
}

export interface ICrewFullModel extends ICrew, IWikiEntity, ITradeableEntity {
}


export const AllCrew: ICrewFullModel[] = [
  {
    Name: CrewNames.Worker,
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/wiki-icons/crew-worker.png',
    Type: EntityTypesEnum.Crew,
    Tags: [CrewTypesEnum.Production],
    Price: 2,
    HistoricalPrices: [],
    RarityFactor: 0,
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
    Type: EntityTypesEnum.Crew,
    Tags: [CrewTypesEnum.Production],
    Price: 5,
    HistoricalPrices: [],
    RarityFactor: 0,
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
  },
  {
    Name: CrewNames.Engineer,
    Description: '', ImageUrl: '/assets/wiki-icons/crew-technician.png',
    Type: EntityTypesEnum.Crew,
    Tags: [CrewTypesEnum.Production],
    Price: 15,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.Food, Quantity: 0.1 },
      { Name: ResourceName.Cash, Quantity: 5 },
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 1 },
      { Name: ResourceName.AdvancedWorkUnit, Quantity: 3 },
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 0
  }
];







