import { UoMsEnum } from "./enums/UoMs.enum";
import { TypesEnum } from "./enums/Types.enum";

export interface IFullEntity {
  Name: string;
  Description: string;
  ImageUrl: string;
  Size: number;
  Type: TypesEnum;
  ProductionCost: ISimpleAsset[],
  ConsumedItems: ISimpleAsset[];
  ProducedItems: ISimpleAsset[];
  UoM: UoMsEnum;
  StartQuantity: number;
}

export interface IEntity {
  Name: string;
  Size: number;
  Type: TypesEnum;
  ProductionCost: ISimpleAsset[],
  ConsumedItems: ISimpleAsset[];
  ProducedItems: ISimpleAsset[];
  UoM: UoMsEnum;
}

export interface IAsset extends IEntity {
  Quantity: number;
}

export interface ISimpleAsset {
  Name: string;
  Quantity: number;
}

export interface IWikiEntity extends IEntity {
  Description: string;
  ImageUrl: string;
}

// export class Asset implements IAsset {
//   Name: string;
//   Quantity: number;

//   constructor2(n: string, q: number) { this.Name = n; this.Quantity = q; }

//   getEntity(): IEntity { return [...AllBuildings, ...AllCivilianCrew, ...AllInventoryItems].find(e => e.Name === this.Name); }
//   getUOM(): UOMsEnum { return this.getEntity().UOM; }
// }
