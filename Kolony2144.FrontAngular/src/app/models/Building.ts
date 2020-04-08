import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { ResourceName } from "./Resource";
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
      { Name: ResourceName.Stone, Quantity: 20 },
      { Name: ResourceName.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceName.LivingSpace, Quantity: 10 }
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
      { Name: ResourceName.Stone, Quantity: 10 },
      { Name: ResourceName.Steel, Quantity: 10 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceName.StorageSpace, Quantity: 500 }
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
      { Name: ResourceName.Stone, Quantity: 10 },
      { Name: ResourceName.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 500 }
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
      { Name: ResourceName.Stone, Quantity: 20 },
      { Name: ResourceName.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 100 }
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 100 }
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
      { Name: ResourceName.Stone, Quantity: 30 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 500 },
      { Name: ResourceName.Energy, Quantity: 500 }
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 100 },
      { Name: ResourceName.AdvancedWorkUnit, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }
]
