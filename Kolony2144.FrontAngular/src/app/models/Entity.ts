import { UoMsEnum } from './enums/UoMs.enum';
import { AssetTypesEnum } from './enums/Types.enum';
import { IDeserializable } from '../core/interfaces/deserializable';
import { IBuilding } from './Building';

export interface IFullEntity extends IEntity, IAsset, IBuilding, IWikiEntity {
}

export interface IEntity {
  Name: string;
  Type: AssetTypesEnum;
  Tags: string[];
  CreationCost: ISimplifiedAsset[];
  MaintenanceCost: ISimplifiedAsset[];
  PassiveIncome: ISimplifiedAsset[];
  UoM: UoMsEnum;
}

export interface ICountableEntity extends IEntity, ISimplifiedAsset {
  Quantity: number;
  // HistoricalPrices: number[];
}


export interface IAsset extends IEntity, ICountableEntity {
  Price: number;
  // HistoricalPrices: number[];
}




export class Asset implements IAsset, IDeserializable {
  Name: string;
  Type: AssetTypesEnum;
  Tags: string[];
  Price: number;
  CreationCost: ISimplifiedAsset[];
  MaintenanceCost: ISimplifiedAsset[];
  PassiveIncome: ISimplifiedAsset[];
  UoM: UoMsEnum;
  Quantity: number;
  // HistoricalPrices: number[];

  Deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}


export interface IWikiEntity {
  Description: string;
  ImageUrl: string;
}


export interface ISimplifiedAsset {
  Name: string;
  Quantity: number;
}
