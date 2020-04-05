export interface IMilitaryCrew {
  Name: MilitaryCrewNames;
  Description: string;
  Quantity: number;
  Salary: number;
  FoodConsumption: number;
  Experience: number; //1+ exponetial growt with battles survived - float
  IsBuff: boolean;
}

export enum MilitaryCrewNames {
  Pilot = 'Pilot',              // SR  pilot
  Soldier = 'Soldier',// SR  soldiers
  Officer = 'Officer',// SR  officers      -bonus to 10xsoldiers
  General = 'General',// SR  general       -bonus to 10xofficers
  Medic = 'Medic',// SR medic
}


export const StarterMilitaryCrew: IMilitaryCrew[] = [
  {
    Name: MilitaryCrewNames.Pilot,
    Description: '',
    Quantity: 0,
    Salary: 5000,
    FoodConsumption: 1,
    Experience: 1,
    IsBuff: false
  },
  {
    Name: MilitaryCrewNames.Soldier,
    Description: '',
    Quantity: 10,
    Salary: 2000,
    FoodConsumption: 2,
    Experience: 1,
    IsBuff: false
  },
  {
    Name: MilitaryCrewNames.Officer,
    Description: 'bonus to 10xsoldiers',
    Quantity: 1,
    Salary: 5000,
    FoodConsumption: 1,
    Experience: 1,
    IsBuff: false
  },
  {
    Name: MilitaryCrewNames.General,
    Description: 'bonus to 10xofficers',
    Quantity: 0,
    Salary: 10000,
    FoodConsumption: 1,
    Experience: 1,
    IsBuff: false
  },
  {
    Name: MilitaryCrewNames.Medic,
    Description: '',
    Quantity: 0,
    Salary: 2000,
    FoodConsumption: 1,
    Experience: 1,
    IsBuff: true
  }
]
