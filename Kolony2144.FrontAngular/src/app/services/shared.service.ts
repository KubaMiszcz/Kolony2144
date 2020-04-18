import { Injectable } from '@angular/core';
import { IAsset, IEntity } from '../models/Entity';

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
