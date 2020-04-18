import { Injectable } from '@angular/core';
import { ICountableEntity } from '../models/Entity';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';
import { UoMsEnum } from '../models/enums/UoMs.enum';

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


  updateInventoryDueToMaintenanceCost() {
    this.allKolonyEntitiesList.forEach(entity => {
      entity.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error? 0?? omit?
        this.sharedService
          .findItemInListByName(this.allKolonyEntitiesList, consumedItem.Name).Quantity -= (consumedItem.Quantity * entity.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItems() {
    this.allKolonyEntitiesList.forEach(entity => {
      entity.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.sharedService
          .findItemInListByName(this.allKolonyEntitiesList, producedItem.Name).Quantity += (producedItem.Quantity * entity.Quantity);
      });
    });
  }


  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }
}
