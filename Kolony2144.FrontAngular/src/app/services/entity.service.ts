import { Injectable } from '@angular/core';
import { IEntity } from '../models/Entity';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';
import { UoMsEnum } from '../models/enums/UoMs.enum';
import { DataProviderService } from './data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  allKolonyEntitiesList: IEntity[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService
  ) {
    this.allKolonyEntitiesList = this.kolonyService.AllKolonyEntities;
  }

  getEntityByName(name: string): IEntity {
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


  getEntitiesByConsumedAssetName(consumedAssetName: ResourceName): IEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  getEntitiesByProducedAssetName(producedAssetName: ResourceName): IEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  getEntitiesByConsumedAssetNameFromList(consumedAssetName: ResourceName): IEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }

  getEntitiesByProducedAssetNameFromList(producedAssetName: ResourceName): IEntity[] {
    const res = [];
    this.allKolonyEntitiesList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  UpdateInventoryDueToMaintenanceCost() {
    this.allKolonyEntitiesList.forEach(entity => {
      entity.MaintenanceCost.forEach(consumedItem => {
        try {
          const item = this.sharedService.findItemInListByName(this.allKolonyEntitiesList, consumedItem.Name);
          // !! fix what if  asset isnt exist in inventory? yyy??? error? 0?? omit?
          // if (!item) {
          //   const newItem = this.gameStaticDataContainerService.getEntityByName(consumedItem.Name);
          //   item = this.commonService.cloneObject(newItem);
          //   this. addNewEntity.ad;
          // } else {
          // }
          item.Quantity -= (consumedItem.Quantity * entity.Quantity);

        } catch (error) {
          console.log('consumed item not in inventory', error);
        }

      });
    });
  }

  UpdateInventoryDueToPassiveProducedItems() {
    this.allKolonyEntitiesList.forEach(entity => {
      entity.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.sharedService
          .findItemInListByName(this.allKolonyEntitiesList, producedItem.Name).Quantity += (producedItem.Quantity * entity.Quantity);
      });
    });
  }




  getMaxProducedQty(entity: IEntity): number {
    const costs = [];
    entity.CreationCost.forEach(m => {
      costs.push(Math.floor(this.getEntityByName(m.Name).Quantity / m.Quantity));
    });

    return Math.min(...costs);
  }
















  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }
}
