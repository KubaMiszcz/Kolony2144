import { SharedService } from './../../services/shared.service';
import { IAsset, IInventoryItem } from '../../models/Entity';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { UoMs } from 'src/app/models/enums/UOMs.enum';
import { KolonyService } from 'src/app/services/kolony.service';
import { ProductionService } from 'src/app/services/production.service';
import { IKolony } from 'src/app/models/Kolony';

@Component({
  selector: 'app-asset-tile',
  templateUrl: './asset-tile.component.html',
  styleUrls: ['./asset-tile.component.scss']
})
export class AssetTileComponent implements OnInit {
  @Input() asset: IAsset;
  productionQty: number = 1;
  maxProductionQty: number = 1;
  productionCost: IproductionCost[] = [];
  inventory: IInventoryItem[] = [];
  disableAddToQueue: boolean;

  constructor(
    private kolonyService: KolonyService,
    private productionService: ProductionService,
    private sharedService: SharedService
  ) { }

  ngOnInit() {
    this.productionService.productionQueueUpdatedEmitter.subscribe(e => {
      this.updateStock();
      this.updatemaxProductionQty();
    });

    this.asset.ProductionCost.forEach(m => {
      let uom = this.sharedService.getUoM(m);
      let stock = this.kolonyService.KolonyBS.value.AllInventoryItemsArray.find(i => i.Name === m.Name);
      this.productionCost.push({ Name: m.Name, QtyPerUnit: m.Quantity, TotalQty: m.Quantity * this.productionQty, StockQty: stock.Quantity, UoM: uom });
    });

    this.maxProductionQty = this.productionService.getMaxProduceedQty(this.asset);

    this.updateCosts();
  }

  updateCosts() {
    this.productionCost.forEach(i => {
      i.TotalQty = i.QtyPerUnit * this.productionQty;
    });
  }

  updateStock() {
    this.productionCost.forEach(i => {
      i.StockQty = this.kolonyService.findInventoryItemFromAllByName(i.Name).Quantity;
    });
  }

  updatemaxProductionQty() {
    this.maxProductionQty = this.productionService.getMaxProduceedQty(this.asset);
  }

  addItemToProductionQueue() {
    if (this.productionQty >= 1) {
      let assetToAdd = { ...this.asset };
      assetToAdd.Quantity = this.productionQty;
      this.productionService.addItemToProductionQueue(assetToAdd);
      this.productionQty = 1;
      this.updateCosts();
      this.updateStock();
      this.updatemaxProductionQty();
    }
  }

  quickAdd(val: any) {
    console.log(this.productionQty + val);
    if (!isNaN(val)) {
      if (this.productionQty + val < 1) this.productionQty = 1;
      // if (this.productionQty + val > this.maxProductionQty) this.productionQty = this.maxProductionQty;
      else this.productionQty += val;
    }
    else if (val === 'clear') this.productionQty = 1;
    else if (val === 'max') this.productionQty = this.maxProductionQty;

    console.log(val, this.productionQty);
    this.updateCosts();
  }

  onChange(event) {
    console.log('onChange', event, this.productionQty);
    this.productionQty = event;
    this.updateCosts();
    // if (event > this.maxProductionQty) event = this.maxProductionQty;
    // else if (event <= 1) event = 1;
    // this.productionQty = event;
  }

}



interface IproductionCost {
  Name: string;
  QtyPerUnit: number;
  TotalQty: number;
  StockQty: number;
  UoM: UoMs
}





