import { UoMs as UoMs } from "./enums/UOMs.enum";
import { InventoryItemsMainTypes, AssetMainTypes } from "./enums/Types.enum";

export interface IEntity {
  Name: string;
  Description: string;
  ImageUrl: string;
  MainType: string;
  DetailedType: string;
  // Density: string;
  UoM: UoMs;
  ProductionCost: IInventoryItemShort[];
}

export interface IInventoryItemShort {
  Name: string;
  Quantity: number;
}

export interface IInventoryItem extends IEntity {
  MainType: InventoryItemsMainTypes;
  Quantity: number;
}

export interface IAsset extends IEntity {
  MainType: AssetMainTypes;
  Size: number;
  ConsumedItems: IInventoryItemShort[];
  ProducedItems: IInventoryItemShort[];
  Quantity: number;
}

// export interface IRawDeposit extends IEntity {
//   MainType: AssetMainTypes;
//   DetailedType: DetailDepositTypes;
//   AttachedExtractors: IAsset[];
//   Quantity: number;
// }






// export interface IRawDeposit {
//   Name: string;
//   Description: string;
//   ImageUrl: string;
//   MainType: string;
//   UOM: UoMs;
//   Quantity: number;
// }














// export interface IDetailedEntity extends IEntity {
//   Description: string;
//   ImageUrl: string;
// }
