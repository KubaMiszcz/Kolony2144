import { IFullEntity } from "./Entity";
import { AssetTypesEnum, MachineTypesEnum } from "./enums/Types.enum";
import { ResourceNames } from "./Resource";
import { UoMsEnum } from "./enums/UoMs.enum";

export enum MachinesNames {
  PowerGenerator = 'Power Generator',
}

export const AllMachines: IFullEntity[] = [
  {
    Name: MachinesNames.PowerGenerator,
    Description: 'simple power coal powered generator', ImageUrl: '/assets/machine.png',
    Size: 10,
    Type: AssetTypesEnum.Machine,
    SubType: MachineTypesEnum.PowerSource,
    CreationCost: [
      { Name: ResourceNames.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceNames.Cash, Quantity: 20 }
    ],
    PassiveIncome: [
      { Name: ResourceNames.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }
]
