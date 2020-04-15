import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';

@Injectable({
  providedIn: 'root'
})
export class SharedService {


  constructor() {
  }

  getRandomFromRange(min: number, max: number) {
    // inputs: integers, output: integer
    return Math.round(min + Math.random() * (max - min));
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


  sumColumnOftable(table: any[][], colNo: number) {
    return table.map(c => c[colNo])
      .reduce((total, i) => total + i);
  }

  cloneObject(asset: IAsset): any {
    return JSON.parse(JSON.stringify(asset));
  }

}
