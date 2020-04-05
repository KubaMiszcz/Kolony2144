import { IFullEntity } from "./Entity";
import { UoMsEnum } from "./enums/UoMs.enum";
import { InventoryItemsNames } from "./InventoryItem";
import { TypesEnum } from "./enums/Types.enum";

export enum CrewNames {
  Worker = 'Worker'
}

export const AllCivilianCrew: IFullEntity[] = [
  {
    Name: CrewNames.Worker,
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/worker.png',
    Size: 1,
    Type: TypesEnum.Crew,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Food, Quantity: 1 },
    ],
    ProducedItems: [],
    UoM: UoMsEnum.pcs,
    StartQuantity: 20
  }
]













