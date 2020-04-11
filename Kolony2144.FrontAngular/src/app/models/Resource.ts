import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { AssetTypesEnum, ResourceTypesEnum } from "./enums/Types.enum";

export enum ResourceName {
  Cash = 'Space Beads',
  Energy = 'Energy',
  BasicWorkUnit = 'Basic Work Unit',
  AdvancedWorkUnit = "Advanced Work Unit",
  StorageSpace = 'Storage space',
  LivingSpace = 'Living space',
  Food = 'Food',
  Stone = 'Stone',
  Steel = 'Steel',
}

export const AllResources: IFullEntity[] = [
  //cash
  {
    Name: ResourceName.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/wiki-icons/resource-cash.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.NotSet,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.SB,
    InitialQuantity: 50000
  },
  {
    Name: ResourceName.Energy,
    Description: 'Energy', ImageUrl: '/assets/wiki-icons/resource-energy.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.kW,
    InitialQuantity: 0
  },
  {
    Name: ResourceName.BasicWorkUnit,
    Description: 'Basic Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    InitialQuantity: 0
  },
  {
    Name: ResourceName.AdvancedWorkUnit,
    Description: 'Advanced Work Unit', ImageUrl: '/assets/wiki-icons/property.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.WU,
    InitialQuantity: 0
  },
  {
    Name: ResourceName.StorageSpace,
    Description: 'Storage Space', ImageUrl: '/assets/wiki-icons/property.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    InitialQuantity: 0
  },
  {
    Name: ResourceName.LivingSpace,
    Description: 'Living Space', ImageUrl: '/assets/wiki-icons/property.png',
    Size: 0,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Volatile,
    InitialPrice: 0,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.m2,
    InitialQuantity: 0
  },
  {
    Name: ResourceName.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/wiki-icons/resource.png',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    InitialPrice: 10,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 100
  },
  {
    Name: ResourceName.Stone,
    Description: 'A piece of stone', ImageUrl: '/assets/wiki-icons/resource.png',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    InitialPrice: 20,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 1000
  },
  {
    Name: ResourceName.Steel,
    Description: 'A piece of steel', ImageUrl: '/assets/wiki-icons/resource.png',
    Size: 1,
    Type: AssetTypesEnum.Resource,
    SubType: ResourceTypesEnum.Production,
    InitialPrice: 25,
    CreationCost: [],
    MaintenanceCost: [],
    PassiveIncome: [],
    UoM: UoMsEnum.t,
    InitialQuantity: 1000
  }
]
