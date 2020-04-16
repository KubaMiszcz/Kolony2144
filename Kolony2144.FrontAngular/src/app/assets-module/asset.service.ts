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
import { SharedService } from '../services/shared.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { UoMsEnum } from '../models/enums/UoMs.enum';

@Injectable({
  providedIn: 'root'
})
export class AssetService {

  kolonyAssetList: IAsset[] = [];

  constructor(
    private sharedService: SharedService,
    private kolonyService: KolonyService,
  ) {
    this.kolonyAssetList = this.kolonyService.getAllKolonyAssets();
  }






  getVolatileAssets(): IAsset[] {
    return this.kolonyAssetList.filter(i => i.Tags.includes(ResourceTypesEnum.Volatile));
  }

  getNonVolatileAssets(): IAsset[] {
    return this.kolonyAssetList.filter(i => !i.Tags.includes(ResourceTypesEnum.Volatile));
  }

  ClearVolatileResources() {
    this.getVolatileAssets().forEach(element => element.Quantity = 0);
  }








  updateInventoryDueToMaintenance(assetList: ICountableEntity[]) {
    assetList.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        // fix what if  asset isnt exist in inventory? yyy??? error?
        this.kolonyAssetList.find(a => a.Name === consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToPassiveProducedItemsByAssets(assetList: ICountableEntity[]) {
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

  xgetAllAssets(): IAsset[] {
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
    const asset = this.sharedService.cloneObject(newAsset) as IAsset;
    asset.Quantity = 0;
    asset.Price = 0;
    this.kolonyAssetList.push(asset);

    return asset;
  }




  getAssetConsumptionQty(cosnumedAsset: IAsset): number {
    let consumedQty = 0;
    this.kolonyAssetList.forEach(asset => {
      const consumedItem = asset.MaintenanceCost.find(item => item.Name === cosnumedAsset.Name);
      if (consumedItem) {
        consumedQty += (asset.Quantity * consumedItem.Quantity);
      }
    });

    return consumedQty;
  }

  getAssetConsumptionQtyByName(assetName: ResourceName): number {
    return this.getAssetConsumptionQty(this.getAssetByName(assetName));
  }




  getAssetProductionQty(producedAsset: IAsset): number {
    let producedQty = 0;
    this.kolonyAssetList.forEach(asset => {
      const producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });

    return producedQty;
  }

  getAssetProductionQtyByName(assetName: ResourceName): number {
    return this.getAssetProductionQty(this.getAssetByName(assetName));
  }



  getAssetsByConsumedAsset(consumedAsset: IAsset): IAsset[] {
    return this.getAssetsByConsumedAssetName(consumedAsset.Name as ResourceName);
  }

  getAssetsByConsumedAssetName(consumedAssetName: ResourceName): IAsset[] {
    const res = [];
    this.kolonyAssetList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }



  getAssetByProducedAsset(producedAsset: IAsset): IAsset[] {
    return this.getAssetsByProducedAssetName(producedAsset.Name as ResourceName);
  }

  getAssetsByProducedAssetName(producedAssetName: ResourceName): IAsset[] {
    const res = [];
    this.kolonyAssetList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });

    return res;
  }



  findSimplifiedResourceInListByName(resourcesList: ISimplifiedAsset[], name: ResourceName): ISimplifiedAsset {
    return resourcesList.find(r => r.Name === name);
  }



  // findAssetInListByName(resourcesList: IAsset[], name: string): IAsset {
  //   return resourcesList.find(i => i.Name === name);
  // }

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
