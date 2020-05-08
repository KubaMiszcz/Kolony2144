import { Injectable, EventEmitter } from '@angular/core';
import { IEntity, ISimplifiedEntity } from '../models/Entity';
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
  constructionQueue: IEntity[] = [];
  productionQueue: IEntity[] = [];
  constructionQueueIsUpdatedEmitter = new EventEmitter<boolean>();

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


  UpdateInventoryDueToMaintenanceCost(list: IEntity[]): any[] {
    const report = [];
    list.forEach(entity => {
      const maxCount = this.getMaxOnlineEntityDueToLackOfMaintenance(entity);
      let diffPlus = 0;

      if (maxCount.length > 0) {
        diffPlus = maxCount[0]?.Quantity - entity.Quantity;
      }

      if (diffPlus !== 0) {
        entity.Quantity += diffPlus;
        entity.OfflineQuantity -= diffPlus;

        if (entity.OfflineQuantity > 0) {
          const missedItems = maxCount.map(m => m.Name);
          report.push('offline ' + entity.OfflineQuantity + 'pcs of ' + entity.Name + ' due to lack of ' + missedItems);
        }
      }

      entity.MaintenanceCost.forEach(consumedItem => {
        try {
          const item = this.getEntityByName(consumedItem.Name);
          if (!!item) {
            item.Quantity -= (consumedItem.Quantity * entity.Quantity);
          }
        } catch (error) {
          console.error('==========================================================');
          console.error('consumed item in entity not in global initial lists', error);
          console.error('==========================================================');
        }
      });
    });

    return report;
  }

  getMaxOnlineEntityDueToLackOfMaintenance(entity: IEntity): ISimplifiedEntity[] {
    // if (entity.MaintenanceCost.length < 1) {
    //   return [null];
    // }
    let maxCounts: ISimplifiedEntity[] = [];
    const totalCount = entity.Quantity + entity.OfflineQuantity;
    entity.MaintenanceCost.forEach(r => {
      const availableQty = this.getEntityByName(r.Name)?.Quantity ?? 0;
      const maxCount = Math.floor(availableQty / r.Quantity);
      maxCounts.push({ Name: r.Name, Quantity: maxCount > totalCount ? totalCount : maxCount });
    });

    maxCounts = maxCounts.sort((a, b) => a.Quantity - b.Quantity);

    return maxCounts.filter(m => m.Quantity === maxCounts[0]?.Quantity);
  }










  UpdateInventoryDueToPassiveProducedItems() {
    const report = [];
    this.allKolonyEntitiesList.forEach(entity => {
      entity.PassiveIncome.forEach(producedItem => {
        if (entity.Quantity > 0) {
          const kolonyItem = this.getEntityByName(producedItem.Name);

          if (!kolonyItem) {
            this.kolonyService.createNewEntityInKolony(this.dataProviderService.getEntityByName(producedItem.Name));
          }

          kolonyItem.Quantity += producedItem.Quantity * entity.Quantity;
          report.push('produced ' + kolonyItem.Quantity + 'pcs of ' + kolonyItem.Name);
        }
      });
    });

    return report;
  }




  getMaxProducedQty(entity: IEntity): number {
    const costs = [];
    entity.CreationCost.forEach(m => {
      costs.push(Math.floor(this.getEntityByName(m.Name).Quantity / m.Quantity));
    });

    return Math.min(...costs);
  }


  addItemToProductionQueue(entity: IEntity) {
    this.constructionQueue.push(entity);
    // this.UpdateInventoryDueToProducedItem(entity, entity.Quantity);
    this.constructionQueueIsUpdatedEmitter.emit(true);
  }

  removeItemFromProductionQueue(entity: IEntity) {
    const idx = this.constructionQueue.indexOf(entity);
    this.constructionQueue.splice(idx, 1);
    // this.UpdateInventoryDueToProducedItem(entity, -1 * entity.Quantity);
    this.constructionQueueIsUpdatedEmitter.emit(true);
  }







  updateInventoryDueToProduceEntity(addedEntity: IEntity, qty: number) {
    addedEntity.CreationCost.forEach(e => {
      this.getEntityByName(e.Name).Quantity -= (e.Quantity * qty);
    });
  }


  getPossibleConstructionQty(item: IEntity): number {
    const countArray = [];
    item.CreationCost.forEach(entity => {
      countArray.push((this.getEntityByName(entity.Name)?.Quantity ?? 0) / entity.Quantity);
    });

    return Math.min(...countArray);
  }

  getPossibleConstructionQties(item: IEntity): { name: string; qty: number }[] {
    const countArray: { name: string; qty: number }[] = [];
    item.CreationCost.forEach(entity => {
      // countArray.push((this.getEntityByName(entity.Name)?.Quantity ?? 0) / entity.Quantity);
      countArray.push({
        name: entity.Name,
        qty: (this.getEntityByName(entity.Name)?.Quantity ?? 0) / entity.Quantity
      });
    });

    return countArray;
  }










  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }
}
