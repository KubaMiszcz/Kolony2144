import { InventoryItemsNames } from "./InventoryItem";
import { AssetMainTypes, DetailedMachineTypes } from "./enums/Types.enum";
import { IEntity, IAsset } from "./Entity";
import { UoMs } from "./enums/UOMs.enum";

export interface IMachine extends IAsset { }

export enum MachinesNames {
  // devices
  PowerGenerator = 'Power Generator',
  //TODO: add them somewhere
  HAL9000 = 'HAL 9000',
  JCN8000 = 'JCN 8000',
  //machines
  LL200LightWorkLoader = 'LL-200 Powered Light Work Loader',
  L500PoweredMediumWorkLoader = 'L-500 Powered Medium Work Loader',
  LH900PoweredHeavyWorkLoader = 'LH-900 Powered Heavy Work Loader',
  W100WheeledWorkLoader = 'W-100 Wheeled Work Loader',
  MobileOreExtractor = 'Mobile Ore Extractor',
  HeavyMobileOreExtractor = "Heavy Mobile Ore Extractor"
}

export const StarterMachines: IMachine[] = [
  //POWER SOURCES
  //POWER SOURCES
  //POWER SOURCES
  {
    Name: MachinesNames.PowerGenerator,
    Description: 'simple power coal powered generator', ImageUrl: '/assets/machine.png',
    Size: 10, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.PowerSource,
    ProductionCost: [
      { Name: InventoryItemsNames.SteelBar, Quantity: 1 }],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 2 },
      { Name: InventoryItemsNames.Coal, Quantity: 100 }],
    ProducedItems: [
      { Name: InventoryItemsNames.Energy, Quantity: 1000 }],
    Quantity: 100,
  },


  //Robots
  //Robots
  //Robots
  {
    Name: MachinesNames.LL200LightWorkLoader,
    Description: '', ImageUrl: '/assets/robot.png',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.Robot,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 100 },
      { Name: InventoryItemsNames.Energy, Quantity: 2 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 2 }],
    Quantity: 10
  }, {
    Name: MachinesNames.L500PoweredMediumWorkLoader,
    Description: '', ImageUrl: '/assets/robot.png',
    Size: 1, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.Robot,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 200 },
      { Name: InventoryItemsNames.Energy, Quantity: 4 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 6 }],
    Quantity: 10
  }, {
    Name: MachinesNames.LH900PoweredHeavyWorkLoader,
    Description: '', ImageUrl: '/assets/robot.png',
    Size: 2, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.Robot,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 400 },
      { Name: InventoryItemsNames.Energy, Quantity: 10 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 18 }],
    Quantity: 10
  }, {
    Name: MachinesNames.W100WheeledWorkLoader,
    Description: '', ImageUrl: '/assets/robot.png',
    Size: 2, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.Robot,
    ProductionCost: [],
    ConsumedItems: [{ Name: InventoryItemsNames.Cash, Quantity: 100 },
    { Name: InventoryItemsNames.Energy, Quantity: 8 }],
    ProducedItems: [{ Name: InventoryItemsNames.BasicWorkUnit, Quantity: 12 }],
    Quantity: 10
  },




  //OTHERS
  {
    Name: MachinesNames.MobileOreExtractor,
    Description: '', ImageUrl: '/assets/machine.png',
    Size: 10, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.OreExtractor,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 100 }
    ],
    ProducedItems: [],
    Quantity: 100
  }, {
    Name: MachinesNames.HeavyMobileOreExtractor,
    Description: '', ImageUrl: '/assets/machine.png',
    Size: 50, UoM: UoMs.pcs, MainType: AssetMainTypes.Machine, DetailedType: DetailedMachineTypes.OreExtractor,
    ProductionCost: [],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.Energy, Quantity: 500 }
    ],
    ProducedItems: [],
    Quantity: 10
  },
]

