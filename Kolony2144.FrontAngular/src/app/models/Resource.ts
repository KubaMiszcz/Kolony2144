import { IEntity, IWikiEntity, IAsset, ITradeableEntity } from './Entity';
import { EntityTypesEnum, GenericTypesEnum, ResourceTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';

export enum ResourceName {
  Cash = 'Space Beads',
  // volatile
  Energy = 'Energy',
  BasicWorkUnit = 'Basic Work Unit',
  AdvancedWorkUnit = 'Advanced Work Unit',
  StorageSpace = 'Storage space',
  LivingSpace = 'Living space',
  PlanetSpace = 'Planet space',
  // storable
  Food = 'Food',
  Stone = 'Stone',
  Steel = 'Steel',
  Diamonds = 'Diamonds',
  Coal = 'Coal',
  Diesel = 'Diesel'
}

export interface IVolatileResource extends IEntity {
}

export interface IVolatileResourceFullModel extends IVolatileResource, IWikiEntity {
}

export interface IResource extends IAsset {
}

export interface IResourceFullModel extends IResource, IWikiEntity, ITradeableEntity {
}

export const AllVolatileResources: IVolatileResourceFullModel[] = [
  {
    Name: ResourceName.Energy,
    Description: 'Energy', ImageUrl: '/assets/wiki-icons/resource-energy.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.kW,
    Quantity: 0
  },
  {
    Name: ResourceName.BasicWorkUnit,
    Description: 'Basic Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    Quantity: 0
  },
  {
    Name: ResourceName.AdvancedWorkUnit,
    Description: 'Advanced Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    Quantity: 0
  },
  {
    Name: ResourceName.StorageSpace,
    Description: 'Storage Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m3,
    Quantity: 0
  },
  {
    Name: ResourceName.LivingSpace,
    Description: 'Living Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m3,
    Quantity: 0
  },
  {
    Name: ResourceName.PlanetSpace,
    Description: 'Planet Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    Quantity: 10000
  }
];




export const AllResources: IResourceFullModel[] = [
  {
    Name: ResourceName.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/wiki-icons/resource-cash.png',
    Type: EntityTypesEnum.Resource,
    Tags: [],
    Price: 0,
    HistoricalPrices: [],
    RarityFactor: 1,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.SB,
    Quantity: 100000
  },
  {
    Name: ResourceName.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 10,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    Quantity: 100
  },
  {
    Name: ResourceName.Stone,
    Description: 'A piece of stone', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 10,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    Quantity: 1000
  },
  {
    Name: ResourceName.Steel,
    Description: 'A piece of steel', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 25,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    Quantity: 1000
  },
  {
    Name: ResourceName.Coal,
    Description: 'A piece of coal', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 15,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    Quantity: 1000
  },
  {
    Name: ResourceName.Diesel,
    Description: 'A piece of diesel', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 15,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.m3,
    Quantity: 1000
  },
  {
    Name: ResourceName.Diamonds,
    Description: 'A piece of Diamond', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: EntityTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production],
    Price: 1000,
    HistoricalPrices: [],
    RarityFactor: 0.95,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 0.01 * 0.01 * 0.01 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.pcs,
    Quantity: 0
  }
];
