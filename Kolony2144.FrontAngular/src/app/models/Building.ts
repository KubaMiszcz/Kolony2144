import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { ResourceNames } from "./Resource";
import { AssetTypesEnum, BuildingTypesEnum } from "./enums/Types.enum";

export enum BuildingNames {
  Habitat = 'Habitat',
  Warehouse = 'Warehouse',
  SolarPanel = 'Solar panel',
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
    ConsumedItems: [
      { Name: ResourceNames.Energy, Quantity: 10 }
    ],
    ProducedItems: [
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
    ConsumedItems: [
      { Name: ResourceNames.Energy, Quantity: 10 }
    ],
    ProducedItems: [
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
    ConsumedItems: [
    ],
    ProducedItems: [
      { Name: ResourceNames.Energy, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }]
