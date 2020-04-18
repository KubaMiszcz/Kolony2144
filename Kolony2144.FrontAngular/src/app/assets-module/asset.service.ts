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
  allKolonyAssetList: IAsset[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
  ) {
    this.allKolonyAssetList = this.kolonyService.getAllKolonyAssets();
  }


  getAssetByName(name: string): IAsset {
    return this.allKolonyAssetList.find(i => i.Name === name);
  }





  getVolatileAssets(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Tags.includes(ResourceTypesEnum.Volatile));
  }

  ClearVolatileAssets() {
    this.getVolatileAssets().forEach(element => element.Quantity = 0);
  }








  updateInventoryDueToMaintenanceCost(entitiesList: ICountableEntity[]) {
    entitiesList.forEach(entity => {
      entity.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error? 0?? omit?
        this.sharedService
          .findItemInListByName(this.allKolonyAssetList, consumedItem.Name).Quantity -= (consumedItem.Quantity * entity.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItems(entitiesList: ICountableEntity[]) {
    entitiesList.forEach(entity => {
      entity.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.sharedService
          .findItemInListByName(this.allKolonyAssetList, producedItem.Name).Quantity += (producedItem.Quantity * entity.Quantity);
      });
    });
  }




















  // ==========================
  // check if not deprecated






  updateInventoryDueToMaintenanceDEPR(assetList: ICountableEntity[]) {
    assetList.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error?
        this.allKolonyAssetList.find(a => a.Name === consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItemsByAssetsDEPR(assetList: ICountableEntity[]) {
    assetList.forEach(asset => {
      asset.PassiveIncome.forEach(producedItem => {
        // fix what if  asset isnt exist in inventory? add new asset to list
        this.allKolonyAssetList.find(a => a.Name === producedItem.Name).Quantity += (producedItem.Quantity * asset.Quantity);
      });
    });
  }



  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////

  getAllResources(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === AssetTypesEnum.Resource);
  }



  getAssetsByType(type: AssetTypesEnum): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === type);
  }


  addNewAssetToInventory(newAsset: IAsset): IAsset {
    const asset = this.commonService.cloneObject(newAsset) as IAsset;
    asset.Quantity = 0;
    asset.Price = 0;
    this.allKolonyAssetList.push(asset);

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
    return this.allKolonyAssetList.find(a => a.Name === resourceName);
  }




  getUoMByName(itemName: string): UoMsEnum {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');

    return 'fixit' as UoMsEnum;
  }

}
