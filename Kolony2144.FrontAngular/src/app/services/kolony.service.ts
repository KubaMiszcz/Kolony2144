import { Injectable } from '@angular/core';
import { IKolony, Kolony } from '../models/Kolony';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  kolony: IKolony;

  constructor(
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Age = 100;
    kolony.Cash = 1000;
    // kolony.Assets=
    this.kolony = kolony;
  }
}

































