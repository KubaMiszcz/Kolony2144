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

  // //todo throw ex eption if metareial form list in not in strater set and for building also
  // get RawResources(): IInventoryItem[] { return this.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.RawResource); }
  // get RawDeposits(): IAsset[] { return this.AllAssetsArray.filter(m => m.MainType === AssetMainTypes.RawDeposit); }

  // get Robots(): IAsset[] { return this.AllMachines.filter(m => m.DetailedType === DetailedMachineTypes.Robot); }


  Deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}


