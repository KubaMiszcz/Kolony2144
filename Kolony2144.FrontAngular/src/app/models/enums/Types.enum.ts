export enum InventoryItemsMainTypes {
  Cash = "Cash",
  Property = "Property",
  Energy = "Energy",
  InventoryItem = "Inventory Item",
  RawResource = 'Raw Resource'
}

export enum DetailedInventoryItemTypes {
  NotSet = "Not Set",
  Basic = 'Basic',
  Advanced = 'Advanced',
  Science = 'Science',
  RawLiquid = "Liquid",
  RawGas = "Gas",
  RawSolid = "Solid",
  Documents = 'Documents'
}

// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
// === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === === ===
export enum AssetMainTypes {
  Crew = "Crew",
  Machine = "Machine",
  // Device = "Device",
  Building = "Building",
  RawDeposit = "Raw Deposit"
}

//    (\w+),
//    $1='$1',

export enum DetailedCrewTypes {
  NotSet = "Not Set",
  Production = 'Production',
  Science = 'Science',
  Managing = 'Managing'
}

export enum DetailedMachineTypes {
  NotSet = "Not Set",
  PowerSource = "Power Source",
  Robot = 'Robot',
  OreExtractor = 'Ore Extractor'
}

export enum DetailedBuildingTypes {
  NotSet = "Not Set",
  PowerSource = "Power Source",
  OreMine = "Ore Mine"
}

// export enum AssetDetailTypesXXXXXXXX {
//   PowerSource = 'Power Source',
//   SpaceFacility = 'Space Facility',
//   OilMine = 'Oil Mine'
// }

export enum ProcessingPhasesNames {
  Production = 'Production',
  Consuming = 'Consuming'
}

