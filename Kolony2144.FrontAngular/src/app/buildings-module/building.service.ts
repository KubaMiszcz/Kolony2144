import { Injectable } from '@angular/core';
import { KolonyService } from '../services/kolony.service';
import { IBuilding } from '../models/Building';
import { AssetService } from '../assets-module/asset.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  kolonyBuildingsList: IBuilding[] = [];
  planetSize: number;

  constructor(
    private kolonyService: KolonyService,
    private assetService: AssetService,
  ) {
    this.kolonyBuildingsList = this.kolonyService.Kolony.Buildings;
  }

}
