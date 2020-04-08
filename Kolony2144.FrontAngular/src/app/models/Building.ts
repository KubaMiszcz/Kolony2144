import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { ResourceNames } from "./Resource";
import { AssetTypesEnum, BuildingTypesEnum } from "./enums/Types.enum";

export enum BuildingNames {
  Habitat = 'Habitat',
  Warehouse = 'Warehouse',
  SolarPanel = 'Solar panel',
  Workshop = "SmallFactory",
  Factory = "Factory"
}

export const AllBuildings: IFullEntity[] = [
  {
    Name: BuildingNames.Habitat,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100,
    Type: AssetTypesEnum.Building,
    SubType: BuildingTypesEnum.Maintenance,
    CreationCost: [
      { Name: ResourceNames.Stone, Quantity: 20 },
      { Name: ResourceNames.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceNames.Energy, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceNames.LivingSpace, Quantity: 10 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  },
  {
    Name: BuildingNames.Warehouse,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000,
    Type: AssetTypesEnum.Building,
    SubType: BuildingTypesEnum.NotSet,
    CreationCost: [
      { Name: ResourceNames.Stone, Quantity: 10 },
      { Name: ResourceNames.Steel, Quantity: 10 }
    ],
    MaintenanceCost: [
      { Name: ResourceNames.Energy, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceNames.StorageSpace, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  },
  {
    Name: BuildingNames.SolarPanel,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000,
    Type: AssetTypesEnum.Building,
    SubType: BuildingTypesEnum.PowerSource,
    CreationCost: [
      { Name: ResourceNames.Stone, Quantity: 10 },
      { Name: ResourceNames.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
    ],
    PassiveIncome: [
      { Name: ResourceNames.Energy, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  },
  {
    Name: BuildingNames.Workshop,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100,
    Type: AssetTypesEnum.Building,
    SubType: BuildingTypesEnum.Production,
    CreationCost: [
      { Name: ResourceNames.Stone, Quantity: 20 },
      { Name: ResourceNames.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
      { Name: ResourceNames.Cash, Quantity: 100 },
      { Name: ResourceNames.Energy, Quantity: 100 }
    ],
    PassiveIncome: [
      { Name: ResourceNames.BasicWorkUnit, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  },
  {
    Name: BuildingNames.Factory,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 200,
    Type: AssetTypesEnum.Building,
    SubType: BuildingTypesEnum.Production,
    CreationCost: [
      { Name: ResourceNames.Stone, Quantity: 30 },
      { Name: ResourceNames.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceNames.Cash, Quantity: 500 },
      { Name: ResourceNames.Energy, Quantity: 500 }
    ],
    PassiveIncome: [
      { Name: ResourceNames.BasicWorkUnit, Quantity: 100 },
      { Name: ResourceNames.AdvancedWorkUnit, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }
]
