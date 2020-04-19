// todo add autofill tags
// fix dont add tags when ti can be deducted form mainetnance like power sources and fill autotags in dataprovider
// fix or volatile
// todo add attacehd entites, and max atatchentities
export enum EntityTypesEnum {
  // todo add volatile type fo resources????
  Crew = 'Crew',
  Resource = 'Resource',
  Building = 'Building',
  Machine = 'Machine',
}



export enum GenericTypesEnum {
  Consuming = 'Consuming',
  Producing = 'Producing',
}


export enum ResourceTypesEnum {
  Production = 'Production',
}

export enum CrewTypesEnum {
  Production = 'Production',
}

export enum BuildingTypesEnum {
  Production = 'Production',
  PowerSource = 'Power source',
  Maintenance = 'Maintenance',
}

export enum MachineTypesEnum {
  Production = 'Production',
  PowerSource = 'Power source',
  Maintenance = 'Maintenance',
}
