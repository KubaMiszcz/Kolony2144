import { Injectable } from '@angular/core';
import { KolonyService } from '../services/kolony.service';
import { IBuilding } from '../models/Building';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  buildingList: IBuilding[] = [];

  constructor(
    private kolonyService: KolonyService,
  ) {
    this.buildingList = this.kolonyService.getAllKolonyBuildings();
  }


}
