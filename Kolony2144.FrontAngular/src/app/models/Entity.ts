import { UoMsEnum } from './enums/UoMs.enum';
import { AssetTypesEnum } from './enums/Types.enum';
import { IDeserializable } from '../core/interfaces/deserializable';
import { IBuilding } from './Building';

export interface IFullEntity extends IEntity, IAsset, IBuilding {
  Description: string;
  ImageUrl: string;
  Price: number;
}

export interface IEntity {
  Name: string;
  Size: number;
  Type: AssetTypesEnum;
  Tags: string[];
  CreationCost: ISimplifiedResource[];
  MaintenanceCost: ISimplifiedResource[];
  PassiveIncome: ISimplifiedResource[];
  UoM: UoMsEnum;
}



export interface IAsset extends IEntity {
  Price: number;
  Quantity: number;
  // HistoricalPrices: number[];
}

export class Asset implements IAsset, IDeserializable {
  Name: string;
  Size: number;
  Type: AssetTypesEnum;
  Tags: string[];
  Price: number;
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
