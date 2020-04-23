import { EntityService } from './../../services/entity.service';
import { AssetService } from './../../assets-module/asset.service';
import { IEntity } from 'src/app/models/Entity';
import { CommonService } from '../../services/common.service';
import { IAsset, ISimplifiedEntity } from '../../models/Entity';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { IKolony } from 'src/app/models/Kolony';
import { UoMsEnum } from 'src/app/models/enums/UoMs.enum';

@Component({
  selector: 'app-asset-tile',
  templateUrl: './asset-tile.component.html',
  styleUrls: ['./asset-tile.component.scss']
})
export class AssetTileComponent implements OnInit {
  @Input() entity: IEntity;
  productionQty = 1;
  maxProductionQty = 1;
  productionCost: IproductionCost[] = [];
  // inventory: ISimplifiedEntity[] = [];
  disableAddToQueue: boolean;

  constructor(
    private kolonyService: KolonyService,
    private entityService: EntityService,
    private assetService: AssetService,
    private commonService: CommonService
  ) { }

  ngOnInit() {
    this.entityService.ProductionQueueEmitter.subscribe(() => {
      this.updateStockRows();
      this.updateMaxProductionQty();
    });

    this.fillStockQtyRows();
    this.updateMaxProductionQty();
    // this.updateCosts();
  }

  updateMaxProductionQty() {
    this.maxProductionQty = this.entityService.getMaxProducedQty(this.entity);
  }




  updateCosts() {
    this.productionCost.forEach(i => {
      i.TotalQty = i.QtyPerUnit * this.productionQty;
    });
  }

  onQtyChange(event: number) {
    console.log('onChange', event, this.productionQty);
    if (event > this.maxProductionQty) {
      this.productionQty = this.maxProductionQty;
    } else if (event <= 1) {
      this.productionQty = 1;
    } else {
      this.productionQty = event;
    }
    this.updateCosts();
  }

  quickAdd(val: number) {
    this.productionQty += val;
    if (this.productionQty < 1) {
      this.productionQty = 1;
    } else if (this.productionQty > this.maxProductionQty) {
      this.productionQty = this.maxProductionQty;
    }
    this.updateCosts();
  }

  updateStockRows() {
    this.productionCost.forEach(i => {
      i.StockQty = this.entityService.getEntityByName(i.Name).Quantity;
    });
  }

  addItemToProductionQueue() {
    if (this.productionQty >= 1) {
      const entityToAdd = { ...this.entity };
      entityToAdd.Quantity = this.productionQty;
      this.entityService.addItemToProductionQueue(entityToAdd);
      this.productionQty = 1;
      this.updateCosts();
      this.updateStockRows();
      this.maxProductionQty = this.entityService.getMaxProducedQty(this.entity);
    }
  }

  fillStockQtyRows() {
    this.entity.CreationCost.forEach(m => {
      const uom = this.entityService.getUoMByName(m.Name);
      const kolonyEntity = this.entityService.getEntityByName(m.Name);
      this.productionCost.push({
        Name: m.Name,
        QtyPerUnit: m.Quantity,
        TotalQty: m.Quantity * this.productionQty,
        StockQty: kolonyEntity.Quantity,
        UoM: uom
      });
    });
  }
}



interface IproductionCost {
  Name: string;
  QtyPerUnit: number;
  TotalQty: number;
  StockQty: number;
  UoM: UoMsEnum;
}





