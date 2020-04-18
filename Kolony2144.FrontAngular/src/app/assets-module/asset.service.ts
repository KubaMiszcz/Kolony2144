import { SharedService } from './../services/shared.service';
import { Injectable } from '@angular/core';
import { KolonyService } from '../services/kolony.service';
import { IAsset, ISimplifiedAsset, ICountableEntity } from '../models/Entity';
import { ResourceTypesEnum, AssetTypesEnum } from '../models/enums/Types.enum';
import { Kolony } from '../models/Kolony';
import { ResourceName } from '../models/Resource';
import { OverviewService } from '../overview-module/overview.service';
import { CrewService } from '../crew-module/crew.service';
import { FinanceService } from '../finances-module/finance.service';
import { GameService } from '../services/game.service';
import { CommonService } from '../services/common.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { UoMsEnum } from '../models/enums/UoMs.enum';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  kolonyAssetList: IAsset[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
  ) {
    this.kolonyAssetList = this.kolonyService.getAllKolonyAssets();
  }

  getEntityByName(name: string): ICountableEntity {
    return this.kolonyAssetList.find(i => i.Name === name);
  }





  getVolatileEntities(): ICountableEntity[] {
    return this.kolonyAssetList.filter(i => i.Tags.includes(ResourceTypesEnum.Volatile));
  }

  ClearVolatileEntities() {
    this.getVolatileEntities().forEach(element => element.Quantity = 0);
  }


  /**
   * returns consumed qty of named entity by all kolony assets buildings etc
   *@param entityName name of consumed entity
   */
  getEntityConsumptionQtyByName(entityName: string): number {
    const cosnumedAsset = this.getEntityByName(entityName);
    let consumedQty = 0;
    this.kolonyAssetList.forEach(asset => {
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
    this.kolonyAssetList.forEach(asset => {
      const producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });

    return producedQty;
  }


  getEntitiesByConsumedAssetName(consumedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.kolonyAssetList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }


  getEntitiesByProducedAssetName(producedAssetName: ResourceName): ICountableEntity[] {
    const res = [];
    this.kolonyAssetList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }





  updateInventoryDueToMaintenanceCost(entitiesList: ICountableEntity[]) {
    entitiesList.forEach(entity => {
      entity.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error? 0?? omit?
        this.sharedService
          .findItemInListByName(this.kolonyAssetList, consumedItem.Name).Quantity -= (consumedItem.Quantity * entity.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItems(entitiesList: ICountableEntity[]) {
    entitiesList.forEach(entity => {
      entity.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.sharedService
          .findItemInListByName(this.kolonyAssetList, producedItem.Name).Quantity += (producedItem.Quantity * entity.Quantity);
      });
    });
  }




















  // ==========================
  // check if not deprecated






  updateInventoryDueToMaintenanceDEPR(assetList: ICountableEntity[]) {
    assetList.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error?
        this.kolonyAssetList.find(a => a.Name === consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItemsByAssetsDEPR(assetList: ICountableEntity[]) {
    assetList.forEach(asset => {
      asset.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.kolonyAssetList.find(a => a.Name === producedItem.Name).Quantity += (producedItem.Quantity * asset.Quantity);
      });
    });
  }



  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////

  getAllAssets(): IAsset[] {
    return this.kolonyAssetList;
  }

  getAllResources(): IAsset[] {
    return this.kolonyAssetList.filter(i => i.Type === AssetTypesEnum.Resource);
  }

  getAssetByName(name: string): IAsset {
    return this.kolonyAssetList.find(i => i.Name === name);
  }

  getAssetsByType(type: AssetTypesEnum): IAsset[] {
    return this.kolonyAssetList.filter(i => i.Type === type);
  }


  addNewAssetToInventory(newAsset: IAsset): IAsset {
    const asset = this.commonService.cloneObject(newAsset) as IAsset;
    asset.Quantity = 0;
    asset.Price = 0;
    this.kolonyAssetList.push(asset);

    return asset;
  }





  // getAssetQuantityFromListByName(assetsList: ISimplifiedResource[], name: string) {
  //   const asset = assetsList.find(s => s.Name === name);
  //   return !!asset ? asset.Quantity : 0;
  // }


  convertSimplifiedResourceToAsset(resource: ISimplifiedAsset): IAsset {
    return this.convertSimplifiedResourceToAssetByName(resource.Name);
  }

  convertSimplifiedResourceToAssetByName(resourceName: string): IAsset {
    return this.kolonyAssetList.find(a => a.Name === resourceName);
  }




  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }

}
