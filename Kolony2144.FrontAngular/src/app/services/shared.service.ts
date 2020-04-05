import { IInventoryItem, IInventoryItemShort, IAsset } from 'src/app/models/Entity';
import { Injectable } from '@angular/core';
import { StarterInventoryItems } from '../models/InventoryItem';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }


  getTotalsForTable(table: any[]) {
    let colNo = table[0].length;
    let totals = [];
    for (let index = 0; index < colNo; index++) {
      totals.push(this.getTotalForColumn(table, index));
    }
    return totals;
  }

  getTotalForColumn(table: any[], colNo: number): any {
    let total = 0;
    table.forEach(r => total += Number(r[colNo]));
    return isNaN(total) ? 'n/a' : total;
  }

  getInventoryItemShortFromListByName(list: IInventoryItemShort[], name: string) {
    return list.find(i => i.Name === name);
  }

  getInventoryItemFromListByName(list: IInventoryItem[], name: string) {
    return list.find(i => i.Name === name);
  }

  getAssetFromListByName(list: IAsset[], name: string) {
    return list.find(i => i.Name === name);
  }

  getQuantityByNameOrDefault(list: IInventoryItemShort[], name: any) {
    let item = list.find(i => i.Name === name);
    return !!item ? item.Quantity : 0;
  }

  getUoM(item: IInventoryItemShort) {
    return StarterInventoryItems.find(m => m.Name === item.Name).UoM;
  }

  getRandomFromRange(min: number, max: number) {
    return Math.round(min + Math.random() * (max - min));
  }

  getRandomValueFromEnum(list: string[]): string {
    let count = list.length;
    let n = Math.round(Math.random() * count);
    return list[n];
  }
}
