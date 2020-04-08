import { UoMsEnum } from "./enums/UoMs.enum";
import { AssetTypesEnum, ResourceTypesEnum, MachineTypesEnum } from "./enums/Types.enum";

export interface IFullEntity extends IEntity, IWikiEntity {
  InitialQuantity: number;
}

export interface IEntity {
  Name: string;
  Size: number;
  Type: AssetTypesEnum;
  SubType: string;
  CreationCost: ISimpleResource[];
  MaintenanceCost: ISimpleResource[];
  PassiveIncome: ISimpleResource[];
  UoM: UoMsEnum;
}

export interface IAsset extends IEntity {
  Quantity: number;
}

export interface ISimpleResource {
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
