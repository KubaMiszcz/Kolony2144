import { InventoryItemsNames } from "./InventoryItem";
import { AssetMainTypes, DetailedCrewTypes } from "./enums/Types.enum";
import { IEntity, IAsset } from "./Entity";
import { UoMs } from "./enums/UOMs.enum";

export interface ICrew extends IAsset { }

export enum CrewNames {
  Worker = 'Worker',
  Technician = 'Technician',
  Engineer = 'Engineer',
  Scientist = 'Scientist',
  Manager = 'Manager',

  //TODO: vadd them
  // OptiMen = 'OptiMen', //special human pgiscal work
  // AutonomousRobotWorker = 'AutonomousRobotWorker', //technciian worker robot//autonomus robot 10 below one enginner no food more energy
  // DroidEngineer = 'DroidEngineer',//autoenginneer//autonomus robot 10 below one enginner no food more energy
  // ScienceNerd = 'ScienceNerd', //elektorscientist//autonomus robot 10 below one enginner no food more energy
  // ElektroMentat = 'Elektro Mentat', //electromanger//autonomus robot 10 below one enginner no food more energy
}

export const StarterCivilianCrew: ICrew[] = [
  {
    Name: CrewNames.Worker,
    Description: 'just peon worker, chop chop he\'s on it, eats many', ImageUrl: '/assets/worker.png',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Crew, DetailedType: DetailedCrewTypes.NotSet,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 2000 },
      { Name: InventoryItemsNames.Food, Quantity: 0.002 },
      { Name: InventoryItemsNames.DeskArea, Quantity: 0 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 4 }],
    Quantity: 500
  }, {
    Name: CrewNames.Technician,
    //doubles WU production for every 5 workers
    Description: 'more qualified staff, need desk for work, but eats less', ImageUrl: '/assets/technician.svg',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Crew, DetailedType: DetailedCrewTypes.NotSet,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 3000 },
      { Name: InventoryItemsNames.Food, Quantity: 0.001 },
      { Name: InventoryItemsNames.DeskArea, Quantity: 1 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 2 }],
    Quantity: 100
  }, {
    Name: CrewNames.Engineer,
    //doubles WU production for every 10 workers and technicians , also doubles bonus froem technician for workers
    Description: 'specialized staff, converts ideas to real things and make them work', ImageUrl: '/assets/engineer.svg',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Crew, DetailedType: DetailedCrewTypes.NotSet,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.Food, Quantity: 0.001 },
      { Name: InventoryItemsNames.DeskArea, Quantity: 3 }],
    ProducedItems: [
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 1 },
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 2 },
      { Name: InventoryItemsNames.SciencePack, Quantity: 1 }
    ],
    Quantity: 10
  }, {
    Name: CrewNames.Scientist,
    Description: 'do some math, and produces ideas ', ImageUrl: '/assets/scientist.svg',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Crew, DetailedType: DetailedCrewTypes.NotSet,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.Food, Quantity: 0.001 },
      { Name: InventoryItemsNames.DeskArea, Quantity: 2 }],
    ProducedItems: [
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 1 },
      { Name: InventoryItemsNames.SciencePack, Quantity: 3 }
    ],
    Quantity: 10
  }, {
    Name: CrewNames.Manager,
    //bonu to 10 engineers-> technicians->workers
    Description: 'well organized man, ', ImageUrl: '/assets/oldscientist.png',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Crew, DetailedType: DetailedCrewTypes.NotSet,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.Food, Quantity: 0.001 },
      { Name: InventoryItemsNames.DeskArea, Quantity: 2 }],
    ProducedItems: [{ Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 1 }],
    Quantity: 2
  }
]












