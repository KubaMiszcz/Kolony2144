import { IAsset } from '../../models/Entity';
import { CrewNames } from './../../models/Crew';
import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { IKolony, Kolony } from 'src/app/models/Kolony';
import { TradeService } from 'src/app/services/trade.service';
import { IInventoryItem } from 'src/app/models/Entity';
import { InventoryItemsMainTypes, AssetMainTypes } from 'src/app/models/enums/Types.enum';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  kolony: IKolony;
  notes: string = '';

  propertiesList: IInventoryItem[];
  energyList: IInventoryItem[];

  rawResourcesList: IInventoryItem[];

  inventoryItemsList: IInventoryItem[];

  crewList: IAsset[];

  machinesList: IAsset[];
  robotsList: IAsset[];
  powerSourcesList: IAsset[];

  buildingsList: IAsset[];
  powerFacilitiesList: IAsset[];

  rawDepositsList: IAsset[];

  //TODO befpre CV upload
  showTotal = 0;

  // warehouseCapacity: number = 0;
  // warehouseUsage: number = 0;
  // warehouseFree: number = 0;
  // warehouseBarValues: any[] = [];

  constructor(
    private gameService: GameService,
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {
    console.log('KolonyService', this.kolony);

    this.propertiesList = this.fillInventoryItemList(this.kolony.Properties);
    this.rawResourcesList = this.fillInventoryItemList(this.kolony.RawResources);
    this.inventoryItemsList = this.fillInventoryItemList(this.kolony.InventoryItems);

    this.powerSourcesList = this.fillInventoryItemList(this.kolony.PowerSources);
    this.powerFacilitiesList = this.fillInventoryItemList(this.kolony.PowerFacilities);
    this.energyList = this.fillInventoryItemList(
      this.kolony.AllInventoryItemsArray.filter(m => m.MainType === InventoryItemsMainTypes.Energy));

    this.crewList = this.fillInventoryItemList(this.kolony.Crew);
    this.robotsList = this.fillInventoryItemList(this.kolony.Robots);
    this.machinesList = this.fillInventoryItemList(this.kolony.Machines);

    this.buildingsList = this.fillInventoryItemList(this.kolony.Buildings);

    this.rawDepositsList = this.fillInventoryItemList(this.kolony.RawDeposits);
    // this.notes = this.gameService.kolonyNotes.value;
  }

  fillInventoryItemList(srcList: any[]) {
    let result = [];
    if (srcList.length > 0) {
      result.push(['Name', 'Qty']);
      srcList.forEach(c => result.push([c.Name, c.Quantity]));
      let totals = this.sharedService.getTotalsForTable(result.slice(1));
      result.push(['Total:', ...totals.slice(1)]);
    }
    return result
  }
}
