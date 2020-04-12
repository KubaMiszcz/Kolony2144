import { UoMsEnum } from "./enums/UoMs.enum";
import { AssetTypesEnum } from "./enums/Types.enum";
import { IDeserializable } from "../core/interfaces/deserializable";

export interface IFullEntity extends IEntity, IAsset, IBuilding {
  Description: string;
  ImageUrl: string;
  InitialPrice: number;
}

export interface IEntity {
  Name: string;
  Size: number;
  Type: AssetTypesEnum;
  SubType: string;
  CreationCost: ISimplifiedResource[];
  MaintenanceCost: ISimplifiedResource[];
  PassiveIncome: ISimplifiedResource[];
  UoM: UoMsEnum;
}


export interface IBuilding extends IEntity {
  Quantity: number;
  // HistoricalPrices: number[];
}


export interface IAsset extends IEntity {
  InitialPrice: number;
  Quantity: number;
  // HistoricalPrices: number[];
}

export class Asset implements IAsset, IDeserializable {
  Name: string;
  Size: number;
  Type: AssetTypesEnum;
  SubType: string;
  InitialPrice: number;
  CreationCost: ISimplifiedResource[];
  MaintenanceCost: ISimplifiedResource[];
  PassiveIncome: ISimplifiedResource[];
  UoM: UoMsEnum;
  Quantity: number;
  // HistoricalPrices: number[];

  Deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}





export interface ISimplifiedResource {
  Name: string;
  Quantity: number;
}

// export class SimplifiedResource implements IDeserializable {
//   Name: string;
//   Quantity: number;

//   Deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }








// export class Asset implements IAsset {
//   Name: string;
//   Quantity: number;

//   constructor2(n: string, q: number) { this.Name = n; this.Quantity = q; }

//   getEntity(): IEntity { return [...AllBuildings, ...AllCivilianCrew, ...AllInventoryItems].find(e => e.Name === this.Name); }
//   getUOM(): UOMsEnum { return this.getEntity().UOM; }
// }
