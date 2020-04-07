import { IAsset } from "./Entity";
import { ResourceNames } from "./Resource";
import { ResourceTypesEnum, AssetTypesEnum } from "./enums/Types.enum";

export interface IKolony {
  Name: string;
  Age: number;
  Assets: IAsset[]
  Cash: number;
}

export class Kolony implements IKolony {
  Name: string;
  Age: number;
  Assets: IAsset[] = [];
  get Cash(): number { return this.Assets.find(m => m.Name === ResourceNames.Cash).Quantity; }
  // set Cash(value: number) { this.Assets.find(m => m.SubType === ResourceTypesEnum.Cash).Quantity = value; }

  // get MaxEnergy(): number { return this.Assets.find(m => m.SubType === ResourceTypesEnum.Energy).Quantity; }
  // get AllCrew(): IAsset[] { return this.Assets.filter(m => m.Type === AssetTypesEnum.Crew); }

  constructor() { }

  // //todo throw ex eption if metareial form list in not in strater set and for building also
  // get Properties(): IInventoryItem[] { return this.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.Property); }
  // get Energy(): IInventoryItem[] { return this.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.Energy); }
  // get RawResources(): IInventoryItem[] { return this.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.RawResource); }
  // get InventoryItems(): IInventoryItem[] { return this.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.InventoryItem); }

  // get Robots(): IAsset[] { return this.AllMachines.filter(m => m.DetailedType === DetailedMachineTypes.Robot); }

  // get AllMachines(): IAsset[] { return this.AllAssetsArray.filter(m => m.MainType === AssetMainTypes.Machine); }
  // get Machines(): IAsset[] { return this.AllMachines.filter(m => m.DetailedType === DetailedMachineTypes.NotSet); }
  // get PowerSources(): IAsset[] { return this.AllMachines.filter(m => m.DetailedType === DetailedMachineTypes.PowerSource); }

  // get AllBuildings(): IAsset[] { return this.AllAssetsArray.filter(m => m.MainType === AssetMainTypes.Building); }
  // get Buildings(): IAsset[] { return this.AllBuildings.filter(m => m.DetailedType === DetailedBuildingTypes.NotSet); }
  // get PowerFacilities(): IAsset[] { return this.AllBuildings.filter(m => m.DetailedType === DetailedBuildingTypes.PowerSource); }

  // get RawDeposits(): IAsset[] { return this.AllAssetsArray.filter(m => m.MainType === AssetMainTypes.RawDeposit); }
}


