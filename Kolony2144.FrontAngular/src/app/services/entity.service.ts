import { Injectable, EventEmitter } from '@angular/core';
import { IEntity } from '../models/Entity';
import { CommonService } from './common.service';
import { SharedService } from './shared.service';
import { KolonyService } from './kolony.service';
import { ResourceName } from '../models/Resource';
import { UoMsEnum } from '../models/enums/UoMs.enum';
import { DataProviderService } from './data-provider.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntityService {
  allKolonyEntitiesList: IEntity[] = [];
  productionQueue: IEntity[] = [];
  ProductionQueueIsUpdatedEmitter = new EventEmitter<boolean>();

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService
  ) {
    this.allKolonyEntitiesList = this.kolonyService.AllKolonyEntities;

    this.kolonyService.KolonyStateUpdatedSubject.subscribe(data => {
      this.allKolonyEntitiesList = this.kolonyService.AllKolonyEntities;
    });
  }

  getEntityByName(name: string): IEntity {
    return this.allKolonyEntitiesList.find(i => i.Name === name);
  }



  /**
  * returns total consumed qty of named entity by ALL kolony assets buildings etc
  *@param entityName name of consumed entity
  */
  getTotalEntityConsumptionQtyByName(entityName: string): number {
    return this.getTotalEntityConsumptionQtyByNameFromList(entityName, this.allKolonyEntitiesList);
  }

  /**
  * returns total consumed qty of named entity by kolony assets IN LIST buildings etc
  *@param entityName name of consumed entity
  */
  getTotalEntityConsumptionQtyByNameFromList(entityName: string, list: IEntity[]): number {
    const consumedEntity = this.getEntityByName(entityName);
    let consumedQty = 0;
    list.forEach(entity => {
      const consumedItemQuantity = entity.MaintenanceCost.find(item => item.Name === consumedEntity.Name)?.Quantity ?? 0;
      consumedQty += (entity.Quantity * consumedItemQuantity);
    });

    return consumedQty;
  }


  /**
  * returns total produced qty of named entity by kolony assets IN LIST buildings etc
  *@param entityName name of produced entity
  */
  getTotalEntityProductionQtyByName(entityName: string): number {
    return this.getTotalEntityProductionQtyByNameFromList(entityName, this.allKolonyEntitiesList);
  }


  /**
  * returns total produced qty of named entity by ALL kolony assets buildings etc
  *@param entityName name of produced entity
  */
  getTotalEntityProductionQtyByNameFromList(entityName: string, list: IEntity[]): number {
    const producedAsset = this.getEntityByName(entityName);
    let producedQty = 0;
    list.forEach(asset => {
      const producedItemQuantity = asset.PassiveIncome.find(item => item.Name === producedAsset.Name)?.Quantity ?? 0;
      producedQty += (asset.Quantity * producedItemQuantity);

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
          console.error('==========================================================');
          console.error('consumed item in entity not in global initial lists', error);
          console.error('==========================================================');
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


  addItemToProductionQueue(entity: IEntity) {
    this.productionQueue.push(entity);
    // this.UpdateInventoryDueToProducedItem(entity, entity.Quantity);
    this.ProductionQueueIsUpdatedEmitter.emit(true);
  }

  removeItemFromProductionQueue(entity: IEntity) {
    const idx = this.productionQueue.indexOf(entity);
    this.productionQueue.splice(idx, 1);
    // this.UpdateInventoryDueToProducedItem(entity, -1 * entity.Quantity);
    this.ProductionQueueIsUpdatedEmitter.emit(true);
  }

  UpdateInventoryDueToProducedItem(addedEntity: IEntity, qty: number) {
    addedEntity.CreationCost.forEach(r => {
      this.getEntityByName(r.Name).Quantity -= (r.Quantity * qty);
    });
  }











  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }
}
