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
    ConsumedItems: [],
    ProducedItems: [
      { Name: ResourceNames.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    InitialQuantity: 10
  }
]
