import { UoMs } from './enums/UOMs.enum';
import { IInventoryItem } from './Entity';
import { InventoryItemsMainTypes, DetailedInventoryItemTypes } from './enums/Types.enum';

export enum InventoryItemsNames {
  //cash
  Cash = 'Space Beads',

  //kolonyprperties
  BasicWorkUnit = 'Basic Work Unit',
  AdvancedWorkUnit = 'Advanced Work Unit',
  SciencePack = 'Science Pack',
  DeskArea = 'Desk Area',
  StorageSpace = 'Storage Space',

  //energy
  Energy = 'Energy',

  //raw mined materials
  Coal = 'Coal',
  IronOre = 'Iron Ore',
  CopperOre = 'Copper Ore',
  UraniumOreE = 'Uranium Ore',
  CrudeOil = 'Crude Oil',
  Gas = "Gas",
  Stone = 'Stone',

  //materials
  Food = 'Food',
  // Iron = 'Iron',
  // Steel='Steel',
  SteelBar = 'Steel Bar',

  Plastic = 'Plastic',
  Uranium238 = 'Uranium-238',   //99.3%
  Uranium235 = 'Uranium-235',  //0.7%
  Blueprints = 'Blueprints',
  Silicon = 'Silicon',
  //concrete
}

export const StarterInventoryItems: IInventoryItem[] = [
  //cash
  {
    Name: InventoryItemsNames.Cash,
    Description: 'Space Beads, galactic currency', ImageUrl: '/assets/cash.svg',
    MainType: InventoryItemsMainTypes.Cash, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 50000000, UoM: UoMs.SB,
    ProductionCost: []
  },

  //kolonyprperties
  {
    Name: InventoryItemsNames.BasicWorkUnit,
    Description: 'simple work unit', ImageUrl: '/assets/property.png',
    MainType: InventoryItemsMainTypes.Property, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.WU,
    ProductionCost: []
  },
  {
    Name: InventoryItemsNames.AdvancedWorkUnit,
    Description: 'needed for more advanced things, produced by qualified personnel', ImageUrl: '/assets/property.png',
    MainType: InventoryItemsMainTypes.Property, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.WU,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.SciencePack,
    Description: 'needed for research, produced by scientists ', ImageUrl: '/assets/property.png',
    MainType: InventoryItemsMainTypes.Property, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.WU,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.DeskArea,
    Description: 'place for work, bench for workers, design desk for engineers', ImageUrl: '/assets/property.png',
    MainType: InventoryItemsMainTypes.Property, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.pcs,
    ProductionCost: []
  },
  {
    Name: InventoryItemsNames.StorageSpace,
    Description: 'volume of storage, used for measure warehouse capacity or entities size', ImageUrl: '/assets/property.png',
    MainType: InventoryItemsMainTypes.Property, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.m3,
    ProductionCost: []
  },

  //energy
  {
    Name: InventoryItemsNames.Energy,
    Description: '', ImageUrl: '/assets/energy.svg',
    MainType: InventoryItemsMainTypes.Energy, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.kW,
    ProductionCost: []
  },

  //raw mined materials
  {
    Name: InventoryItemsNames.Coal,
    Description: 'coal, energetic material, used also in chemistry', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawSolid,
    Quantity: 1000000, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.IronOre,
    Description: 'ore', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawSolid,
    Quantity: 10000, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.CopperOre,
    Description: 'ore', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawSolid,
    Quantity: 10000, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.UraniumOreE,
    Description: '', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawSolid,
    Quantity: 10000, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.CrudeOil,
    Description: '', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawLiquid,
    Quantity: 10000, UoM: UoMs.m3,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Gas,
    Description: '', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawGas,
    Quantity: 10000, UoM: UoMs.m3,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Stone,
    Description: '', ImageUrl: '/assets/rawitem.svg',
    MainType: InventoryItemsMainTypes.RawResource, DetailedType: DetailedInventoryItemTypes.RawSolid,
    Quantity: 10000, UoM: UoMs.m3,
    ProductionCost: []
  },



  //materials
  {
    Name: InventoryItemsNames.Food,
    Description: 'food for feeding your men and animals;]', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 1000, UoM: UoMs.t,
    ProductionCost: []
  },

  // iron
  //steel

  {
    Name: InventoryItemsNames.SteelBar,
    Description: 'made from steel, used in contruction building and devices', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 10000, UoM: UoMs.t,
    ProductionCost: [
      { Name: InventoryItemsNames.IronOre, Quantity: 10 },
      { Name: InventoryItemsNames.Coal, Quantity: 10 }
    ]
  }, {
    Name: InventoryItemsNames.Plastic,
    Description: 'ordinary plastic', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 1000, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Uranium238,
    Description: 'ordinary plastic', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Uranium235,
    Description: 'ordinary plastic', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 0, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Blueprints,
    Description: 'designs blueprints drawings, documents', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 10, UoM: UoMs.t,
    ProductionCost: []
  }, {
    Name: InventoryItemsNames.Silicon,
    Description: 'made from sand', ImageUrl: '/assets/item.svg',
    MainType: InventoryItemsMainTypes.InventoryItem, DetailedType: DetailedInventoryItemTypes.NotSet,
    Quantity: 10000, UoM: UoMs.t,
    ProductionCost: []
  }
]
