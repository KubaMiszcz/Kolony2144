import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() {
  }

  getRandomFromRange(min: number, max: number) {
    //inputs: integers, output: integer
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomBoolean() {
    return Math.random() > 0.5 ? true : false;
  }


  getRandomValueFromEnum(list: string[]): string {
    let count = list.length;
    let n = Math.round(Math.random() * count);
    return list[n];
  }

  sumColumnOftable(table: any[][], colNo: number) {
    return table.map(c => c[colNo])
      .reduce((total, i) => total + i);
  }

}
