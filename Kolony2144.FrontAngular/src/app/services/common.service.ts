import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() {
  }

  getRandomBoolean(factor: number = 0.5) {
    return Math.random() < factor ? true : false;
  }



  getRandomIntFromRange(min: number, max: number) {
    // inputs: integers, output: integer
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomIntAroundValue(baseValue: number, aroundValue: number): number {
    return this.getRandomIntFromRange(baseValue - aroundValue, baseValue + aroundValue);
  }



  getRandomFloatFromRange(min: number, max: number) {
    // inputs: floats, output: float
    return min + Math.random() * (max - min);
  }

  getRandomFloatAroundValue(baseValue: number, aroundValue: number): number {
    return this.getRandomFloatFromRange(baseValue - aroundValue, baseValue + aroundValue);
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



  sumColumnOftableByHeader(table: any[][], header: string) {
    if (!table || table.length < 2) {
      return 0;
    }
    const colNo = table[0].indexOf(header);

    return colNo > 0 ? this.sumColumnOftable(table.slice(1), colNo) : 0;
  }

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
