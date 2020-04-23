import { IDeserializable } from '../core/interfaces/deserializable';
import { IEntity, ISimplifiedEntity, IWikiEntity } from './Entity';
import { EntityTypesEnum, BuildingTypesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

export enum BuildingNames {
  Habitat = 'Habitat',
  Warehouse = 'Warehouse',
  SolarPanel = 'Solar panel',
  Workshop = 'Workshop',
  Factory = 'Factory',
  CargoBay = 'Cargo bay',
  CoalPowerPlant = 'Coal Powered Plant'
}

export interface IBuilding extends IEntity {
  // todo attach entiotes to factories etc, they are not produce naything whhen empty
  // todo add attacehd entites, and max atatchentities
}

export interface IBuildingFullModel extends IBuilding, IWikiEntity {
}

export class Building implements IBuilding, IDeserializable {
  Tags: string[];
  Quantity: number;
  Name: string;
  Type: EntityTypesEnum;
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
    Type: EntityTypesEnum.Building,
    Tags: [BuildingTypesEnum.Maintenance],
    CreationCost: [
      { Name: ResourceName.Stone, Quantity: 200 },
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.PlanetSpace, Quantity: 20 * 40 }
    ],
    PassiveIncome: [
      { Name: ResourceName.LivingSpace, Quantity: 20 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  },
  {
    Name: BuildingNames.Warehouse,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: EntityTypesEnum.Building,
    Tags: [], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 50 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.PlanetSpace, Quantity: 100 * 100 }
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
    Type: EntityTypesEnum.Building,
    Tags: [], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 5 },
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.PlanetSpace, Quantity: 5 * 5 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 20
  },
  {
    Name: BuildingNames.CoalPowerPlant,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: EntityTypesEnum.Building,
    Tags: [], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 1000 },
      { Name: ResourceName.Steel, Quantity: 2000 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 1000 },
      { Name: ResourceName.PlanetSpace, Quantity: 200 * 200 },
      { Name: ResourceName.Coal, Quantity: 100 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 1000 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 1
  },
  {
    Name: BuildingNames.Workshop,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: EntityTypesEnum.Building,
    Tags: [BuildingTypesEnum.Production], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 50 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 100 },
      { Name: ResourceName.Energy, Quantity: 100 },
      { Name: ResourceName.PlanetSpace, Quantity: 20 * 20 }
    ],
    PassiveIncome: [
      { Name: ResourceName.BasicWorkUnit, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 1
  },
  {
    Name: BuildingNames.Factory,
    Description: '', ImageUrl: '/assets/wiki-icons/building.png',
    Type: EntityTypesEnum.Building,
    Tags: [BuildingTypesEnum.Production], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 1000 },
      { Name: ResourceName.Steel, Quantity: 3000 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 500 },
      { Name: ResourceName.Energy, Quantity: 500 },
      { Name: ResourceName.PlanetSpace, Quantity: 100 * 100 }
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
    Type: EntityTypesEnum.Building,
    Tags: [], CreationCost: [
      { Name: ResourceName.Stone, Quantity: 50 },
      { Name: ResourceName.Steel, Quantity: 100 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 50 },
      { Name: ResourceName.Energy, Quantity: 50 },
      { Name: ResourceName.PlanetSpace, Quantity: 50 * 50 }
    ],
    PassiveIncome: [
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10
  }
];
