import { IDeserializable } from '../core/interfaces/deserializable';
import { IEntity, ISimplifiedEntity, ITradeableEntity, IWikiEntity } from './Entity';
import { AssetTypesEnum, BuildingTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

export enum BuildingNames {
  Habitat = 'Habitat',
  Warehouse = 'Warehouse',
  SolarPanel = 'Solar panel',
  Workshop = 'Workshop',
  Factory = 'Factory',
  CargoBay = 'Cargo bay'
}

export interface IBuilding extends IEntity {
}

export interface IBuildingFullModel extends IBuilding, IWikiEntity, ITradeableEntity {
}

export class Building implements IBuilding, IDeserializable {
  Tags: string[];
  Quantity: number;
  Name: string;
  Type: AssetTypesEnum;
  SubType: string;
  CreationCost: ISimplifiedEntity[];
  MaintenanceCost: ISimplifiedEntity[];
  PassiveIncome: ISimplifiedEntity[];
  UoM: UoMsEnum;

  Deserialize(input: any): this {
    Object.assign(this, input);

    return this;
  }
}

export const AllBuildings: IBuildingFullModel[] = [
  {
    Name: BuildingNames.Habitat,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: AssetTypesEnum.Building,
    Tags: [BuildingTypesEnum.Maintenance],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 20 },
      { Name: ResourceName.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.PlanetSpace, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceName.LivingSpace, Quantity: 10 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  },
  {
    Name: BuildingNames.Warehouse,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: AssetTypesEnum.Building,
    Tags: [],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 10 },
      { Name: ResourceName.Steel, Quantity: 10 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.PlanetSpace, Quantity: 100 }
    ],
    PassiveIncome: [
      { Name: ResourceName.StorageSpace, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  },
  {
    Name: BuildingNames.SolarPanel,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',

    Type: AssetTypesEnum.Building,
    Tags: [BuildingTypesEnum.PowerSource],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 10 },
      { Name: ResourceName.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.PlanetSpace, Quantity: 25 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 20
  },
  {
    Name: BuildingNames.Workshop,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',

    Type: AssetTypesEnum.Building,
    Tags: [BuildingTypesEnum.Production],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 20 },
      { Name: ResourceName.Steel, Quantity: 20 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 100 },
      { Name: ResourceName.PlanetSpace, Quantity: 10 }
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 3
  },
  {
    Name: BuildingNames.Factory,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',

    Type: AssetTypesEnum.Building,
    Tags: [BuildingTypesEnum.Production],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 30 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 500 },
      { Name: ResourceName.Energy, Quantity: 500 },
      { Name: ResourceName.PlanetSpace, Quantity: 100 }
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 100 },
      { Name: ResourceName.AdvancedWorkUnit, Quantity: 500 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 1
  },
  {
    Name: BuildingNames.CargoBay,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',

    Type: AssetTypesEnum.Building,
    Tags: [],
    Price: 0,
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 30 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 50 },
      { Name: ResourceName.Energy, Quantity: 50 },
      { Name: ResourceName.PlanetSpace, Quantity: 100 }
    ],
    PassiveIncome: [
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  }
];
