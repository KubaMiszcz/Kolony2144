import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  getRandomFloatFromRange(min: number, max: number) {
    // inputs: floats, output: float
    return min + Math.random() * (max - min);
  }

  getRandomFloatAroundValue(baseValue: number, aroundValue: number): number {
    return this.getRandomFloatFromRange(baseValue - aroundValue, baseValue + aroundValue);
  }

  getRandomIntFromRange(min: number, max: number) {
    // inputs: integers, output: integer
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomIntAroundValue(baseValue: number, aroundValue: number): number {
    return this.getRandomIntFromRange(baseValue - aroundValue, baseValue + aroundValue);
  }

  getRandomBoolean() {
    return Math.random() > 0.5 ? true : false;
  }


  getRandomValueFromEnum(list: string[]): string {
    const count = list.length;
    const n = Math.round(Math.random() * count);

    return list[n];
  }

  Round(val: number, precision: number): number {
    const base = Math.pow(10, precision);

    return Math.round((val * base)) / base;
  }


  // todo add sumColumnOftableByColumnHeader
  sumColumnOftable(table: any[][], colNo: number) {
    if (!table || table.length < 1) {
      return 0;
    }

    return table.map(c => c[colNo]).reduce((total, i) => total + i);
  }

  cloneObject<T>(object: T): T {
    return JSON.parse(JSON.stringify(object)) as T;
  }
}
