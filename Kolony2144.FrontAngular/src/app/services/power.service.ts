import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { SharedService } from './shared.service';

import { InventoryItemsNames } from '../models/InventoryItem';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  kolony: IKolony;
  powerStatusBS = new BehaviorSubject<number[]>([0, 0, 0]);

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
    this.powerStatusBS.next([this.MaxPower, 0, this.PowerUsage]);
  }

  updatePowerStatus() {
    this.powerStatusBS.next([this.MaxPower, 0, this.PowerUsage]);
  }


  get MaxPower() {
    let prod = 0;

    this.kolony.PowerFacilities.forEach(asset =>
      asset.ProducedItems.filter(producedItem => producedItem.Name === InventoryItemsNames.Energy).forEach(e =>
        prod += e.Quantity * asset.Quantity));

    this.kolony.PowerSources.forEach(asset =>
      asset.ProducedItems.filter(producedItem => producedItem.Name === InventoryItemsNames.Energy).forEach(e =>
        prod += e.Quantity * asset.Quantity));
    return prod;
  }

  get PowerUsage() {
    let usage = 0;
    this.kolony.AllAssetsArray.forEach(asset =>
      asset.ConsumedItems.filter(consumedItem => consumedItem.Name === InventoryItemsNames.Energy).forEach(e =>
        usage += e.Quantity * asset.Quantity));
    return usage;
  }
}


