import { IEntity, ITradeableEntity, IWikiEntity, IAsset } from './Entity';
import { AssetTypesEnum, GenericTypesEnum, MachineTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

export enum MachinesNames {
  PowerGenerator = 'Power Generator',
  TeslaCoil = 'Tesla Coil',
}

export interface IMachine extends IAsset {
}

export interface IMachineFullModel extends IMachine, IWikiEntity, ITradeableEntity {
}

export const AllMachines: IMachineFullModel[] = [
  {
    Name: MachinesNames.PowerGenerator,
    Description: 'simple power coal powered generator', ImageUrl: '/assets/wiki-icons/machine.png',
    Type: AssetTypesEnum.Machine,
    Tags: [MachineTypesEnum.PowerSource, , GenericTypesEnum.Tradeable],
    Price: 5000,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 20 },
      { Name: ResourceName.StorageSpace, Quantity: 20 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  },
  {
    Name: MachinesNames.TeslaCoil,
    Description: 'sparks', ImageUrl: '/assets/wiki-icons/machine.png',

    Type: AssetTypesEnum.Machine,
    Tags: [GenericTypesEnum.Tradeable],
    Price: 100,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.StorageSpace, Quantity: 10 }
    ],
    PassiveIncome: [
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 5
  }
];
