import { IFullEntity } from "./Entity";
import { AssetTypesEnum, MachineTypesEnum } from "./enums/Types.enum";
import { ResourceName } from "./Resource";
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
      { Name: ResourceName.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 20 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }
]
