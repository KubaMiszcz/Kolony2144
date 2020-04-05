import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { InventoryItemsNames } from "./InventoryItem";
import { TypesEnum } from "./enums/Types.enum";

export enum BuildingNames {
  Habitat = 'Habitat',
  Warehouse = 'Warehouse',
}

export const AllBuildings: IFullEntity[] = [
  {
    Name: BuildingNames.Habitat,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100,
    Type: TypesEnum.Building,
    ProductionCost: [
      { Name: InventoryItemsNames.Stone, Quantity: 20 },
      { Name: InventoryItemsNames.Steel, Quantity: 5 }
    ],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  },
  {
    Name: BuildingNames.Warehouse,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000,
    Type: TypesEnum.Building,
    ProductionCost: [
      { Name: InventoryItemsNames.Stone, Quantity: 10 },
      { Name: InventoryItemsNames.Steel, Quantity: 10 }
    ],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }]
