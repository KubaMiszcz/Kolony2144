import { IFullEntity } from "./Entity";
import { TypesEnum } from "./enums/Types.enum";
import { InventoryItemsNames } from "./InventoryItem";
import { UoMsEnum } from "./enums/UoMs.enum";

export enum MachinesNames {
  PowerGenerator = 'Power Generator',
}

export const AllMachines: IFullEntity[] = [
  {
    Name: MachinesNames.PowerGenerator,
    Description: 'simple power coal powered generator', ImageUrl: '/assets/machine.png',
    Size: 10,
    Type: TypesEnum.Machine,
    ProductionCost: [
      { Name: InventoryItemsNames.Steel, Quantity: 5 }
    ],
    ConsumedItems: [],
    ProducedItems: [],
    UoM: UoMsEnum.pcs,
    StartQuantity: 10
  }
]
