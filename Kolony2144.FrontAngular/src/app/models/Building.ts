import { InventoryItemsNames } from './InventoryItem';
import { IEntity, IAsset } from './Entity';
import { AssetMainTypes as AssetMainTypes, DetailedBuildingTypes } from './enums/Types.enum';
import { UoMs } from './enums/UOMs.enum';
import { CamelCaseToHumanCasePipe } from '../shared/pipes/camelCaseToHumanCase.pipe';

export interface IBuilding extends IAsset { }

export enum BuildingNames {
  //power facilities
  PowerPlant = 'Power Plant',
  SolarPanel = 'Solar Panel',
  NuclearPowerPlant = 'Nuclear Power Plant',

  //buildings
  Habitat = 'Habitat',
  CargoBay = 'Cargo Bay',
  Warehouse = 'Warehouse',
  OreMine = 'Ore Mine',
  OilRefinery = 'Oil Refinery',
  Workshop = 'Workshop',
  DesignOffice = 'Design Office',
  Laboratory = 'Laboratory',
  Centrifuge = 'Centrifuge',

  //mines
  CoalDeposit = 'Coal Deposit',
  IronOreDeposit = 'Iron Ore Deposit',
  CopperOreDeposit = 'Copper Ore Deposit',
  UraniumOreDeposit = 'Uranium Ore Deposit',
  OilDeposit = 'Oil Deposit',
  Quarry = 'Quarry'


  // liquidtank
  // silo, presuure tank,
  // HydroponicGardens
  // copper
  // SteelMill
  // CopperMill
  // Factory

  //

  /*

  potem:
  institute - bonus to laboratroy
  Shipyard
  SpacePort
  ControlTower -bonu to spaceport
  OreMinesAnd
  UraniumCentrifuge
  SpaceScanneMediumRange - for looking for moons
  Biolab

  RobotBB1
  RobotBB2
  SteamTurbine
  Academy/MilitaryAcademy

  miitary:
  barracks
  shootingrangemodule
  electronicwarfare module
  defense station
  radar


  hangar
  cargobay
  laser array
  particle beam gun
  dropship
  communicationmodule
  fusion
  coolant


  */
}

export const StarterBuildings: IBuilding[] = [
  // power sources
  // power sources
  // power sources

  {
    Name: BuildingNames.PowerPlant,
    //bonus to 10 generators
    Description: 'produces energy', ImageUrl: '/assets/buildings/nuclear-power-plant-3d-model_D.jpg',
    Size: 1000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.PowerSource,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 100 },
      { Name: InventoryItemsNames.Plastic, Quantity: 50 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.100 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.Energy, Quantity: 10 },
      { Name: InventoryItemsNames.Coal, Quantity: 100 }
    ],
    ProducedItems: [{ Name: InventoryItemsNames.Energy, Quantity: 1000 }],
    Quantity: 2
  }, {
    Name: BuildingNames.SolarPanel,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.PowerSource,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 2000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 100 },
      { Name: InventoryItemsNames.Plastic, Quantity: 50 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.5 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 10 }
    ],
    ProducedItems: [{ Name: InventoryItemsNames.Energy, Quantity: 1000 }],
    Quantity: 2
  },
  {
    Name: BuildingNames.NuclearPowerPlant,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 10000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.PowerSource,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 100000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 100000 },
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 20000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 1000 },
      { Name: InventoryItemsNames.Plastic, Quantity: 500 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 5 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.Energy, Quantity: 100 }
    ],
    ProducedItems: [{ Name: InventoryItemsNames.Energy, Quantity: 10000 }],
    Quantity: 0
  },



  // /buildings
  // /buildings
  // /buildings
  {
    Name: BuildingNames.Habitat,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 100 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 10 },
      { Name: InventoryItemsNames.Plastic, Quantity: 2 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.01 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 10 }],
    ProducedItems: [], //TODO: is flat produced material??
    Quantity: 10
  }, {
    Name: BuildingNames.CargoBay,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 1000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 1000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 50 },
      { Name: InventoryItemsNames.Plastic, Quantity: 5 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.1 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.Energy, Quantity: 20 }],
    ProducedItems: [],
    Quantity: 100
  }, {
    Name: BuildingNames.Warehouse,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 1000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 100 },
      { Name: InventoryItemsNames.Plastic, Quantity: 2 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.05 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 100 },
      { Name: InventoryItemsNames.Energy, Quantity: 2 }],
    ProducedItems: [{ Name: InventoryItemsNames.StorageSpace, Quantity: 1000 }],
    Quantity: 100
  }, {
    Name: BuildingNames.OreMine,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.OreMine,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 1000 },
      { Name: InventoryItemsNames.Plastic, Quantity: 20 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 1 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 20000 },
      { Name: InventoryItemsNames.Energy, Quantity: 100 }],
    ProducedItems: [],
    Quantity: 1
  }, {
    Name: BuildingNames.OilRefinery,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 1000, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 10000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 2000 },
      { Name: InventoryItemsNames.Plastic, Quantity: 20 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 2 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 20000 },
      { Name: InventoryItemsNames.Energy, Quantity: 100 }],
    ProducedItems: [
      { Name: InventoryItemsNames.CrudeOil, Quantity: 1000 },
      { Name: InventoryItemsNames.Gas, Quantity: 1000 }
    ],
    Quantity: 1
  }, {
    Name: BuildingNames.Workshop,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 1000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 100 },
      { Name: InventoryItemsNames.Plastic, Quantity: 10 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 1 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 2500 },
      { Name: InventoryItemsNames.Energy, Quantity: 100 }],
    ProducedItems: [],
    Quantity: 10
  }, {
    Name: BuildingNames.Laboratory,
    Description: '', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 10000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 10 },
      { Name: InventoryItemsNames.Plastic, Quantity: 20 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 1 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.Energy, Quantity: 1000 }],
    ProducedItems: [],
    Quantity: 10
  },
  {
    Name: BuildingNames.Centrifuge,
    Description: 'used to enrichment U-238', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.Building, DetailedType: DetailedBuildingTypes.NotSet,
    ProductionCost: [
      { Name: InventoryItemsNames.Cash, Quantity: 1000 },
      { Name: InventoryItemsNames.BasicWorkUnit, Quantity: 2500 },
      { Name: InventoryItemsNames.AdvancedWorkUnit, Quantity: 1000 },
      { Name: InventoryItemsNames.SteelBar, Quantity: 10 },
      { Name: InventoryItemsNames.Plastic, Quantity: 10 },
      { Name: InventoryItemsNames.Blueprints, Quantity: 0.1 }
    ],
    ConsumedItems: [
      { Name: InventoryItemsNames.Cash, Quantity: 5000 },
      { Name: InventoryItemsNames.Energy, Quantity: 1000 },
      { Name: InventoryItemsNames.UraniumOreE, Quantity: 1000 }
    ],
    ProducedItems: [
      { Name: InventoryItemsNames.Uranium238, Quantity: 993 },
      { Name: InventoryItemsNames.Uranium235, Quantity: 7 }
    ],
    Quantity: 1
  },




  //DEPOSITS
  //DEPOSITS
  //DEPOSITS
  {
    Name: BuildingNames.CoalDeposit,
    Description: 'CoalDeposit', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.Coal,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }, {
    Name: BuildingNames.IronOreDeposit,
    Description: 'IronOreDeposit', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.IronOre,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }, {
    Name: BuildingNames.CopperOreDeposit,
    Description: 'CopperOreDeposit', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.CopperOre,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }, {
    Name: BuildingNames.UraniumOreDeposit,
    Description: 'UraniumOreDeposit', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.UraniumOreE,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }, {
    Name: BuildingNames.OilDeposit,
    Description: 'OilDeposit', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.CrudeOil,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }, {
    Name: BuildingNames.Quarry,
    Description: 'Quarry', ImageUrl: '/assets/building.svg',
    Size: 100, UoM: UoMs.pcs, MainType: AssetMainTypes.RawDeposit, DetailedType: InventoryItemsNames.Stone,
    ProductionCost: [],
    ConsumedItems: [],
    ProducedItems: [],
    Quantity: 1000000
  }

]


