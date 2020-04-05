import { Injectable, EventEmitter } from '@angular/core';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { SharedService } from './shared.service';
import { BehaviorSubject } from 'rxjs';
import { IAsset, IInventoryItem } from '../models/Entity';


@Injectable({
  providedIn: 'root'
})
export class ProductionService {
  productionQueueBS = new BehaviorSubject<IAsset[]>([]);
  productionQueueUpdatedEmitter = new EventEmitter<number>();
  kolony: IKolony;

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }








  addItemToProductionQueue(asset: IAsset) {
    this.productionQueueBS.value.push(asset);
    this.updateInventory(asset, asset.Quantity);
    this.productionQueueUpdatedEmitter.emit();
  }

  removeItemFromProductionQueue(asset: IAsset) {
    let idx = this.productionQueueBS.value.indexOf(asset);
    this.productionQueueBS.value.splice(idx, 1);
    this.updateInventory(asset, -asset.Quantity);
    this.productionQueueUpdatedEmitter.emit();
  }

  private updateInventory(asset: IAsset, assetQty: number) {
    asset.ProductionCost.forEach(item => {
      this.kolonyService.findInventoryItemFromAllByName(item.Name).Quantity -= (item.Quantity) * assetQty;
    });
  }

  getMaxProduceedQty(asset: IAsset) {
    let costs = [];
    asset.ProductionCost.forEach(m => {
      costs.push(Math.floor(this.kolonyService.findInventoryItemFromAllByName(m.Name).Quantity / m.Quantity));
    });
    return Math.min(...costs);
  }















  produceAssetsInQueue() {
    this.productionQueueBS.value.every(singleAssetInQueue => {
      if (this.produceSingleAssetInQueue(singleAssetInQueue) <= 0) return;
    });
  }

  private produceSingleAssetInQueue(asset: IAsset) {
    console.log(asset);
    let max = this.getMaxProduceedQty(asset);
    let producedQty = asset.Quantity > max ? max : asset.Quantity;


    //todo XXXXXXXXXXXXXXXX
    if (producedQty > 0) {
      asset.Quantity -= producedQty;
      if (asset.Quantity <= 0) this.removeItemFromProductionQueue(asset);
      this.updateInventory(asset, producedQty);
      this.updateKolonyAssets(asset, producedQty);
      return producedQty;
    }
  }

  // private produceSingleAssetInQueue(asset: IAsset) {
  //   let amountOfRequiredItemsInInventory: IInventoryItem[] = [];
  //   asset.ProductionCost.forEach(i => amountOfRequiredItemsInInventory.push(this.kolonyService.findInventoryItemFromAllByName(i.Name)));
  //   let producedQtyByItem = [];

  //   for (let index = 0; index < amountOfRequiredItemsInInventory.length; index++) {
  //     producedQtyByItem.push(Math.floor(amountOfRequiredItemsInInventory[index].Quantity / asset.ProductionCost[index].Quantity));
  //   }
  //   let producedQty = Math.min(...producedQtyByItem);

  //   if (producedQty > 0) {
  //     asset.Quantity -= producedQty;
  //     if (asset.Quantity <= 0) this.removeItemFromProductionQueue(asset);
  //     this.updateInventory(asset, producedQty);
  //     this.updateKolonyAssets(asset, producedQty);
  //   }
  //   return producedQty;
  // }

  private updateKolonyAssets(producedAsset: IAsset, producedAssetQty: number) {
    this.kolonyService.findAssetFromAllByName(producedAsset.Name).Quantity += producedAssetQty;
    console.log(producedAsset.Name, ' +', producedAssetQty);
  }



}


