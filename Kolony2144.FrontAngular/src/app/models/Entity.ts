import { UoMsEnum } from './enums/UoMs.enum';
import { EntityTypesEnum } from './enums/Types.enum';
import { IDeserializable } from '../core/interfaces/deserializable';
import { IBuilding } from './Building';

export interface IEntityModel {
  Name: string;
  Type: EntityTypesEnum;
  Tags: string[];
  // future TechLevel:number;
  CreationCost: ISimplifiedEntity[];
  MaintenanceCost: ISimplifiedEntity[];
  // future IdleMaintenanceCost: ISimplifiedEntity[];
  PassiveIncome: ISimplifiedEntity[];
  UoM: UoMsEnum;
}


export interface IEntity extends IEntityModel, ISimplifiedEntity {
  Quantity: number;
  // future IsTurnedOff:boolean
  // future MaintainPriority:number
}


export interface IAsset extends IEntityModel, ISimplifiedEntity {
  Price: number; // info dont move it to Ienity, Ibuilding doesnt need price but inherits from enity
}

export interface ITradeableEntity extends IAsset {
  // future PriceVariationFactor: unmber'
  HistoricalPrices: number[];
  RarityFactor: number;
}




export class Asset implements IAsset, IDeserializable {
  Name: string;
  Type: EntityTypesEnum;
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
