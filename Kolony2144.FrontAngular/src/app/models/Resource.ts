import { IFullEntity } from './Entity';
import { UoMsEnum } from './enums/UoMs.enum';
import { AssetTypesEnum, ResourceTypesEnum, GenericTypesEnum } from './enums/Types.enum';

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
}

export const AllResources: IFullEntity[] = [
  {
    Name: ResourceName.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/wiki-icons/resource-cash.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.SB,
    Quantity: 100000
  },
  {
    Name: ResourceName.Energy,
    Description: 'Energy', ImageUrl: '/assets/wiki-icons/resource-energy.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.kW,
    Quantity: 0
  },
  {
    Name: ResourceName.BasicWorkUnit,
    Description: 'Basic Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    Quantity: 0
  },
  {
    Name: ResourceName.AdvancedWorkUnit,
    Description: 'Advanced Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    Quantity: 0
  },
  {
    Name: ResourceName.StorageSpace,
    Description: 'Storage Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    Quantity: 0
  },
  {
    Name: ResourceName.LivingSpace,
    Description: 'Living Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    Quantity: 0
  },
  {
    Name: ResourceName.PlanetSpace,
    Description: 'Planet Space', ImageUrl: '/assets/wiki-icons/property.png',
    Type: AssetTypesEnum.Resource,
    Tags: [GenericTypesEnum.Property, ResourceTypesEnum.Volatile],
    Price: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    Quantity: 10000
  },




















  {
    Name: ResourceName.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: AssetTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 10,
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
    Type: AssetTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 20,
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
    Type: AssetTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 25,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    Quantity: 1000
  },
  {
    Name: ResourceName.Diamonds,
    Description: 'A piece of Diamond', ImageUrl: '/assets/wiki-icons/resource.png',
    Type: AssetTypesEnum.Resource,
    Tags: [ResourceTypesEnum.Production, GenericTypesEnum.Tradeable],
    Price: 1000,
    CreationCost: [],
    MaintenanceCost: [
      { Name: ResourceName.StorageSpace, Quantity: 1 }
    ],
    PassiveIncome: [],
    UoM: UoMsEnum.pcs,
    Quantity: 0
  }
];
