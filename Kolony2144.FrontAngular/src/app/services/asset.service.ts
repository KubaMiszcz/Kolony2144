import { Injectable } from '@angular/core';
import { KolonyService } from './kolony.service';
import { IAsset, ISimplifiedResource } from '../models/Entity';
import { ResourceTypesEnum, AssetTypesEnum } from '../models/enums/Types.enum';
import { Kolony } from '../models/Kolony';
import { ResourceName } from '../models/Resource';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  private assetList: IAsset[];

  constructor(
    private kolonyService: KolonyService,
  ) {
    this.assetList = this.kolonyService.getAllAssets();
  }

  getAllAssets(): IAsset[] {
    return this.assetList;
  }

  getKolonyVolatileAssets(): IAsset[] {
    return this.assetList.filter(i => i.SubType === ResourceTypesEnum.Volatile);
  }

  getKolonyAssetByName(name: string): IAsset {
    return this.assetList.find(i => i.Name === name);
  }

  getKolonyAssetsByType(type: AssetTypesEnum): IAsset[] {
    return this.assetList.filter(i => i.Type === type);
  }

  getMonthlyAssetConsumption(cosnumedAsset: IAsset): number {
    let consumedQty = 0;
    this.assetList.forEach(asset => {
      let consumedItem = asset.MaintenanceCost.find(item => item.Name === cosnumedAsset.Name);
      if (consumedItem) {
        consumedQty += (asset.Quantity * consumedItem.Quantity);
      }
    });
    return consumedQty;
  }

  getMonthlyAssetConsumptionByName(assetName: ResourceName): number {
    return this.getMonthlyAssetConsumption(this.getKolonyAssetByName(assetName));
  }


  getMonthlyAssetProduction(producedAsset: IAsset): number {
    let producedQty = 0;
    this.assetList.forEach(asset => {
      let producedItem = asset.PassiveIncome.find(item => item.Name === producedAsset.Name);
      if (producedItem) {
        producedQty += (asset.Quantity * producedItem.Quantity);
      }
    });
    return producedQty;
  }

  getMonthlyAssetProductionByName(assetName: ResourceName): number {
    return this.getMonthlyAssetProduction(this.getKolonyAssetByName(assetName));
  }

  getAssetListByConsumedAsset(consumedAsset: IAsset): IAsset[] {
    return this.getAssetsListByConsumedAssetName(consumedAsset.Name as ResourceName);
  }

  getAssetsListByConsumedAssetName(consumedAssetName: ResourceName): IAsset[] {
    let res = [];
    this.assetList.forEach(asset => {
      if (!!asset.MaintenanceCost.find(item => item.Name === consumedAssetName)) {
        res.push(asset);
      }
    });
    return res;
  }

  getAssetListByProducedAsset(producedAsset: IAsset): IAsset[] {
    return this.getAssetsListByProducedAssetName(producedAsset.Name as ResourceName);
  }

  getAssetsListByProducedAssetName(producedAssetName: ResourceName): IAsset[] {
    let res = [];
    this.assetList.forEach(asset => {
      if (!!asset.PassiveIncome.find(item => item.Name === producedAssetName)) {
        res.push(asset);
      }
    });
    return res;
  }

  findResourceInAssetByName(resourcesList: ISimplifiedResource[], name: ResourceName) {
    return resourcesList.find(r => r.Name === name);
  }

  findAssetInListByName(resourcesList: IAsset[], name: string) {
    return resourcesList.find(i => i.Name === name);
  }

  getAssetQuantityFromListByName(assetsList: ISimplifiedResource[], name: string) {
    const asset = assetsList.find(s => s.Name === name);
    return !!asset ? asset.Quantity : 0;
  };
}
