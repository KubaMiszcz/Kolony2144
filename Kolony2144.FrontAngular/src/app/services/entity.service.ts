import { Injectable } from '@angular/core';
import { ICountableEntity } from '../models/Entity';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  allKolonyEntitiesList: ICountableEntity[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService
  ) {
    this.allKolonyEntitiesList = this.kolonyService.getAllKolonyEntities();
  }

  getEntityByName(name: string): ICountableEntity {
    return this.allKolonyEntitiesList.find(i => i.Name === name);
  }



  /**
 * returns consumed qty of named entity by all kolony assets buildings etc
 *@param entityName name of consumed entity
 */
  getEntityConsumptionQtyByName(entityName: string): number {
    const cosnumedAsset = this.getEntityByName(entityName);
    let consumedQty = 0;
    this.allKolonyEntitiesList.forEach(asset => {
      const consumedItem = asset.MaintenanceCost.find(item => item.Name === cosnumedAsset.Name);
      if (consumedItem) {
        consumedQty += (asset.Quantity * consumedItem.Quantity);
      }
    });

    return consumedQty;
  }

  /**
 * returns produced qty of named entity by all kolony assets buildings etc
 *@param entityName name of produced entity
 */
  getEntityProductionQtyByName(assetName: string): number {
    const producedAsset = this.getEntityByName(assetName);
    let producedQty = 0;
    this.allKolonyEntitiesList.forEach(asset => {
      const producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });

    return producedQty;
  }


  getEntitiesByConsumedAssetName(consumedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  getEntitiesByProducedAssetName(producedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  getEntitiesByConsumedAssetNameFromList(consumedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }

  getEntitiesByProducedAssetNameFromList(producedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }





}
