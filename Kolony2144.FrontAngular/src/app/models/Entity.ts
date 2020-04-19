import { UoMsEnum } from './enums/UoMs.enum';
import { AssetTypesEnum } from './enums/Types.enum';
import { IDeserializable } from '../core/interfaces/deserializable';
import { IBuilding } from './Building';

// export interface IWikiEntity extends IEntityModel, IAsset, IBuilding, IWikiEntity {
// }

export interface IEntityModel {
  Name: string;
  Type: AssetTypesEnum;
  Tags: string[];
  CreationCost: ISimplifiedEntity[];
  MaintenanceCost: ISimplifiedEntity[];
  PassiveIncome: ISimplifiedEntity[];
  UoM: UoMsEnum;
}

// todo
// make maintain cost different when idle
// attach entiotes to factories etc, they are not produce naything whhen empty

export interface IEntity extends IEntityModel, ISimplifiedEntity {
  Quantity: number;
}


// fix get rid of it and move it to IENtity
export interface IAsset extends IEntityModel, ISimplifiedEntity {
  Price: number; // dont move it to Ienity, Ibuilding doesnt need price but inherits from enity
}

export interface ITradeableEntity extends IAsset {
  // HistoricalPrices: number[];
  // CommonnessFactor:number
}




export class Asset implements IAsset, IDeserializable {
  Name: string;
  Type: AssetTypesEnum;
  Tags: string[];
  Price: number;
  CreationCost: ISimplifiedEntity[];
  MaintenanceCost: ISimplifiedEntity[];
  PassiveIncome: ISimplifiedEntity[];
  UoM: UoMsEnum;
  Quantity: number;

  Deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}


export interface IWikiEntity extends IEntityModel {
  Description: string;
  ImageUrl: string;
}


export interface ISimplifiedEntity {
  Name: string;
  Quantity: number;
}
