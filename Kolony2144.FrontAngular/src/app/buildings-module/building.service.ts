import { Injectable } from '@angular/core';
import { KolonyService } from '../services/kolony.service';
import { IBuilding } from '../models/Building';
import { AssetService } from '../assets-module/asset.service';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {
  updateInventoryDuewwwwToMaintenanceBuildings() {
  }
  kolonyBuildingsList: IBuilding[] = [];

  constructor(
    private kolonyService: KolonyService,
    private assetService: AssetService,
  ) {
    this.kolonyBuildingsList = this.kolonyService.getAllKolonyBuildings();
  }

  updateInventoryDueToMaintenanceBuildings() {
    this.kolonyBuildingsList.forEach(building => {
      building.MaintenanceCost.forEach(consumedItem => {
        const asset = this.assetService.getAssetByName(consumedItem.Name);
        // fix what if  asset isnt exist in inventory?
        if (!!asset) {
          asset.Quantity -= (consumedItem.Quantity * building.Quantity);
        } else {
          throw new Error('fix what if  asset isnt exist in inventory?');
        }
      });
    });
  }

  updateInventoryDueToPassiveProducedItemsBuildings() {
    this.kolonyBuildingsList.forEach(building => {
      building.MaintenanceCost.forEach(consumedItem => {
        const asset = this.assetService.getAssetByName(consumedItem.Name);
        // fix what if  asset isnt exist in inventory?
        if (!!asset) {
          asset.Quantity -= (consumedItem.Quantity * building.Quantity);
        } else {
          throw new Error('fix what if  asset isnt exist in inventory?');
        }
      });
    });
  }

}
