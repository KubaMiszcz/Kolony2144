import { IDeserializable } from '../core/interfaces/deserializable';
import { IBuilding } from './Building';
import { IAsset } from './Entity';
import { IResource } from './Resource';
import { ICrew } from './Crew';
import { IMachine } from './Machine';

export interface IKolony {
  Age: number;
  Name: string;
  AssetsDEPR: IAsset[];
  Resources: IResource[];
  Buildings: IBuilding[];
  Crew: ICrew[];
  Machines: IMachine[];
}

export class Kolony implements IKolony, IDeserializable {
  Age: number;
  Name: string;
  AssetsDEPR: IAsset[] = [];
  Resources: IResource[] = [];
  Buildings: IBuilding[] = [];
  Crew: ICrew[] = [];
  Machines: IMachine[] = [];

  constructor() { }

  Deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}


