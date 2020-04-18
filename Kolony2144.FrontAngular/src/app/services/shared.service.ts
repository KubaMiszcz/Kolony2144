import { Injectable } from '@angular/core';
import { IAsset, IEntity, ICountableEntity } from '../models/Entity';
import { ResourceName } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
  }

  findItemInListByName<T>(list: T[], name: string): T {
    return list.find(r => ((r as unknown) as IEntity).Name === name);
  }



}
