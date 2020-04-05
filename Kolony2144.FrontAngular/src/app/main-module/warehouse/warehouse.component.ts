import { SharedService } from './../../services/shared.service';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { IKolony } from 'src/app/models/Kolony';
import { IInventoryItem } from 'src/app/models/Entity';
import { UoMs } from 'src/app/models/enums/UOMs.enum';
import { BuildingNames } from 'src/app/models/Building';
import { InventoryItemsNames } from 'src/app/models/InventoryItem';
import { InventoryItemsMainTypes } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.scss']
})
export class WarehouseComponent implements OnInit {
  kolony: IKolony;
  rawlist: any[] = [];
  rawMaterialsList: IInventoryItem[];
  totalRawMaterialsQty: number = 0;
  materialsList: IInventoryItem[];
  totalMaterialsQty: number = 0;

  warehouseCapacity: number = 0;
  warehouseUsage: number = 0;
  warehouseFree: number = 0;
  warehouseBarValues: any[] = [];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {

    this.rawMaterialsList = this.kolony.RawResources;
    this.totalRawMaterialsQty = this.getTotalMaterialsQuantity(this.rawMaterialsList);

    this.materialsList = this.kolony.InventoryItems;
    // this.totalMaterialsQty = this.getTotalMaterialsQuantity(this.materialsList);

    // let warehouse = this.kolony.Buildings.find(b => b.Name === BuildingNames.Warehouse);


    // this.warehouseCapacity = this.kolony.Materials.find(m => m.Name === InventoryItemsNames.StorageSpace).Quantity;
    // this.warehouseUsage = this.totalRawMaterialsQty + this.totalMaterialsQty;
    // this.warehouseFree = this.warehouseCapacity - this.warehouseUsage;

    // this.warehouseBarValues.push({ value: this.warehouseUsage, type: 'dark', label: this.warehouseUsage + ' / ' + this.warehouseCapacity });
    // this.warehouseBarValues.push({ value: this.warehouseFree, type: 'success', label: 'free: ' + this.warehouseFree });
  }

  getTotalMaterialsQuantity(materialsList: IInventoryItem[]): number {
    let total = 0;
    materialsList.forEach(m => {
      if (m.UoM === UoMs.kg) { total += 0.000001 * m.Quantity; }
      else if (m.UoM === UoMs.t) { total += 0.001 * m.Quantity; }
      else if (m.UoM === UoMs.kt) { total += m.Quantity; }
      else if (m.UoM === UoMs.m3) { total += m.Quantity; }
      else { throw m.UoM + " UOM not in list"; }
    })
    return total;
  }


}
