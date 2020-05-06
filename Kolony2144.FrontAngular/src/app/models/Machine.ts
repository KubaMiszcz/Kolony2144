import { IEntity, IWikiEntity, IAsset, ITradeableEntity } from './Entity';
import { EntityTypesEnum, GenericTypesEnum, MachineTypesEnum, PrioritiesEnum } from './enums/Types.enum';
import { UoMsEnum } from './enums/UoMs.enum';
import { ResourceName } from './Resource';

// fix w trade pojawiaja sie pieniadze wywal to

// todo co mi zzera wegiel i
// czyli podsumwoanie resources i ile zywa i ile sie produkcuje
// w trade buttony nie +-10 tylko +- polowa i =- 1.4 towara
// takei podusmwoanei jak w transport tycoon czyli co na plu co na minus i roznica
// po sprzedazy do 0 pamietaj ostatnia cene, albo zrob  te historucal prices
// przy tabelce resourceces ze zzeraniem jakies rozwijanie wierszy ze szeczoglami co zzera i ile
// i co produkuje tez tabela z rozwijaniem wierszy
// moze diwe koluny np zo mi zzera kase i iile dodaje a potem total

// future burzenie budynkow
// wlaczanie wlaczanie maszyn i budynkow bo teraz duzo generaotr zera w pizdziet wegla



export enum MachinesNames {
  PowerGenerator = 'Power Generator',
  TeslaCoil = 'Tesla Coil',
  StorageContainer = 'Storage Container',
  CoalOreExtractor = 'CoalOreExtractor'
}

export interface IMachine extends IAsset {
}

export interface IMachineFullModel extends IMachine, IWikiEntity, ITradeableEntity {
}

export const AllMachines: IMachineFullModel[] = [
  {
    Name: MachinesNames.PowerGenerator,
    Description: 'simple power coal powered generator', ImageUrl: '/assets/wiki-icons/machine.png',
    Type: EntityTypesEnum.Machine,
    Tags: [],
    Price: 5000,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 5 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Cash, Quantity: 20 },
      { Name: ResourceName.StorageSpace, Quantity: 4 * 4 * 4 },
      { Name: ResourceName.Diesel, Quantity: 20 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Energy, Quantity: 100 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 10,
    OfflineQuantity: 0,
    MaintainPriority: PrioritiesEnum.High
  },
  {
    Name: MachinesNames.TeslaCoil,
    Description: 'sparks', ImageUrl: '/assets/wiki-icons/machine.png',
    Type: EntityTypesEnum.Machine,
    Tags: [],
    Price: 100,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 10 },
      { Name: ResourceName.StorageSpace, Quantity: 2 * 2 * 5 }
    ],
    PassiveIncome: [
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 5,
    OfflineQuantity: 0,
    MaintainPriority: PrioritiesEnum.High
  },
  {
    Name: MachinesNames.StorageContainer,
    Description: 'storage container', ImageUrl: '/assets/wiki-icons/machine.png',
    Type: EntityTypesEnum.Machine,
    Tags: [],
    Price: 50,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 1 },
      { Name: ResourceName.Cash, Quantity: 10 },
      { Name: ResourceName.PlanetSpace, Quantity: 10 * 3 }
    ],
    PassiveIncome: [
      { Name: ResourceName.StorageSpace, Quantity: 10 * 3 * 3 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 5,
    OfflineQuantity: 0,
    MaintainPriority: PrioritiesEnum.High
  },
  {
    Name: MachinesNames.CoalOreExtractor,
    Description: 'storage container', ImageUrl: '/assets/wiki-icons/machine.png',
    Type: EntityTypesEnum.Machine,
    Tags: [],
    Price: 5000,
    HistoricalPrices: [],
    RarityFactor: 0,
    CreationCost: [
      { Name: ResourceName.Steel, Quantity: 50 }
    ],
    MaintenanceCost: [
      { Name: ResourceName.Energy, Quantity: 100 },
      { Name: ResourceName.Cash, Quantity: 500 },
      { Name: ResourceName.PlanetSpace, Quantity: 50 * 50 }
    ],
    PassiveIncome: [
      { Name: ResourceName.Coal, Quantity: 200 }
    ],
    UoM: UoMsEnum.pcs,
    Quantity: 2,
    OfflineQuantity: 0,
    MaintainPriority: PrioritiesEnum.High
  }
];
