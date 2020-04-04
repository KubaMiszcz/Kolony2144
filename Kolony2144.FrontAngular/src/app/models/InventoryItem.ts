import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { TypesEnum } from "./enums/Types.enum";

export enum InventoryItemsNames {
  Cash = 'Space Beads',
  Food = 'Food',
  Stone = 'Stone',
  Steel = 'Steel',
}

export const AllInventoryItems: IFullEntity[] = [
  //cash
  {
    Name: InventoryItemsNames.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/cash.svg',
    Size: 0,
    Type: TypesEnum.Resource,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.SB,
    StartQuantity: 5000
  },
  {
    Name: InventoryItemsNames.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/item.svg',
    Size: 1,
    Type: TypesEnum.Resource,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.t,
    StartQuantity: 100
  },
  {
    Name: InventoryItemsNames.Stone,
    Description: 'A piece of stone', ImageUrl: '/assets/property.png',
    Size: 1,
    Type: TypesEnum.Resource,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.t,
    StartQuantity: 1000
  },
  {
    Name: InventoryItemsNames.Steel,
    Description: 'A piece of steel', ImageUrl: '/assets/property.png',
    Size: 1,
    Type: TypesEnum.Resource,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.t,
    StartQuantity: 1000
  }
]
