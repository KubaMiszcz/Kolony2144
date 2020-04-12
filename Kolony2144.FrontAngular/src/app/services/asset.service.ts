import { Injectable } from '@angular/core';
import { KolonyService } from './kolony.service';
import { IAsset, ISimplifiedResource } from '../models/Entity';
import { ResourceTypesEnum, AssetTypesEnum } from '../models/enums/Types.enum';
import { Kolony } from '../models/Kolony';
import { ResourceName } from '../models/Resource';
import { OverviewService } from './overview.service';
import { PowerService } from './power.service';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { GameService } from './game.service';
import { SharedService } from './shared.service';
import { TradeService } from './trade.service';
import { WikiService } from './wiki.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assetList: IAsset[];

  constructor(
    private crewService: CrewService,
    private financeService: FinanceService,
    private gameService: GameService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private sharedService: SharedService,
    private tradeService: TradeService,
    private wikiService: WikiService,
  ) {
    this.assetList = this.kolonyService.getAllKolonyAssets();
  }






  getVolatileAssets(): IAsset[] {
    return this.assetList.filter(i => i.SubType === ResourceTypesEnum.Volatile);
  }

  getNonVolatileAssets(): IAsset[] {
    return this.assetList.filter(i => i.SubType !== ResourceTypesEnum.Volatile);
  }

  ClearVolatileResources() {
    this.getVolatileAssets().forEach(element => element.Quantity = 0);
  }








  updateInventoryDueToMaintenance() {
    this.assetList.forEach(asset => {
      asset.MaintenanceCost.forEach(consumedItem => {
        this.assetList.find(a => a.Name == consumedItem.Name).Quantity -= (consumedItem.Quantity * asset.Quantity);
      });
    });
  }

  updateInventoryDueToProducingItems() {
    this.assetList.forEach(asset => {
      asset.PassiveIncome.forEach(producedItem => {
        this.assetList.find(a => a.Name == producedItem.Name).Quantity += (producedItem.Quantity * asset.Quantity);
      });
    });
  }



  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////

  getAllAssets(): IAsset[] {
    return this.assetList;
  }

  getAllResources(): IAsset[] {
    return this.assetList.filter(i => i.Type === AssetTypesEnum.Resource);
  }

  getAssetByName(name: string): IAsset {
    return this.assetList.find(i => i.Name === name);
  }

  getAssetsByType(type: AssetTypesEnum): IAsset[] {
    return this.assetList.filter(i => i.Type === type);
  }






  getAssetConsumptionQty(cosnumedAsset: IAsset): number {
    let consumedQty = 0;
    this.assetList.forEach(asset => {
      let consumedItem = asset.MaintenanceCost.find(item => item.Name === cosnumedAsset.Name);
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
    this.assetList.forEach(asset => {
      let producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
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
    let res = [];
    this.assetList.forEach(asset => {
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
    let res = [];
    this.assetList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });
    return res;
  }



  findSimplifiedResourceInListByName(resourcesList: ISimplifiedResource[], name: ResourceName): ISimplifiedResource {
    return resourcesList.find(r => r.Name === name);
  }



  // findAssetInListByName(resourcesList: IAsset[], name: string): IAsset {
  //   return resourcesList.find(i => i.Name === name);
  // }

  // getAssetQuantityFromListByName(assetsList: ISimplifiedResource[], name: string) {
  //   const asset = assetsList.find(s => s.Name === name);
  //   return !!asset ? asset.Quantity : 0;
  // }


  convertSimplifiedResourceToAsset(resource: ISimplifiedResource): IAsset {
    return this.convertSimplifiedResourceToAssetByName(resource.Name);
  }

  convertSimplifiedResourceToAssetByName(resourceName: string): IAsset {
    return this.assetList.find(a => a.Name === resourceName);
  }




  getUoMByName(itemName: string) {
    // return this.allWikiEntites.find(m => m.Name === item.Name).UoM;
    console.log('getUoMForSimpleAsset..........................................');
    return 'fixit';
  }

}
