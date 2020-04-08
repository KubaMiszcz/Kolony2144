import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { AssetTypesEnum, ResourceTypesEnum } from "./enums/Types.enum";

export enum ResourceNames {
  Cash = 'Space Beads',
  Energy = 'Energy',
  BasicWorkUnit = 'Basic Work Unit',
  AdvancedWorkUnit = "AdvancedWorkUnit",
  StorageSpace = 'Storage space',
  LivingSpace = 'Living space',
  Food = 'Food',
  Stone = 'Stone',
  Steel = 'Steel',
}

export const AllResources: IFullEntity[] = [
  //cash
  {
    Name: ResourceNames.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/cash.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.NotSet,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.SB,
    InitialQuantity: 5000
  },
  {
    Name: ResourceNames.Energy,
    Description: 'Energy', ImageUrl: '/assets/energy.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.kW,
    InitialQuantity: 0
  },
  {
    Name: ResourceNames.BasicWorkUnit,
    Description: 'BasicWorkUnit', ImageUrl: '/assets/item.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    InitialQuantity: 0
  },
  {
    Name: ResourceNames.AdvancedWorkUnit,
    Description: 'AdvancedWorkUnit', ImageUrl: '/assets/item.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    InitialQuantity: 0
  },
  {
    Name: ResourceNames.StorageSpace,
    Description: 'StorageSpace', ImageUrl: '/assets/item.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    InitialQuantity: 0
  },
  {
    Name: ResourceNames.LivingSpace,
    Description: 'Energy', ImageUrl: '/assets/item.svg',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    InitialQuantity: 0
  },
  {
    Name: ResourceNames.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/item.svg',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 100
  },
  {
    Name: ResourceNames.Stone,
    Description: 'A piece of stone', ImageUrl: '/assets/item.png',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 1000
  },
  {
    Name: ResourceNames.Steel,
    Description: 'A piece of steel', ImageUrl: '/assets/item.png',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 1000
  }
]
