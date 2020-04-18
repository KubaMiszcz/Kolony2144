import { Component, OnInit } from '@angular/core';
import { ICountableEntity } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from 'src/app/services/common.service';
import { BuildingService } from '../building.service';
import { GameService } from 'src/app/services/game.service';
import { IBuilding } from 'src/app/models/Building';
import { SharedService } from 'src/app/services/shared.service';
import { WarehouseService } from 'src/app/warehouse-module/warehouse.service';
import { ResourceName } from 'src/app/models/Resource';
import { GenericTypesEnum } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-buildings-overview',
  templateUrl: './buildings-overview.component.html',
  styleUrls: ['./buildings-overview.component.scss']
})
export class BuildingsOverviewComponent implements OnInit {
  kolonyBuildingsTableRows: any[] = [];
  // allBuildingsList: ICountableEntity[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
    private buildingService: BuildingService,
  ) { }

  ngOnInit(): void {
    this.kolonyBuildingsTableRows = this.fillSummaryTableRows(
      this.buildingService.kolonyBuildingsList,
      ResourceName.PlanetSpace,
      GenericTypesEnum.Consuming
    );


    // this.allBuildingsList = this.gameService.ALL_BUILDINGS_LIST;
  }

  fillSummaryTableRows(entities: ICountableEntity[], resourceName: ResourceName, type: GenericTypesEnum) {
    const res: any[][] = [
      ['name', 'type', 'per unit', 'qty', 'total']
    ];

    entities.forEach(r => {
      const list = type === GenericTypesEnum.Consuming ? r.MaintenanceCost : r.PassiveIncome;
      const perUnitUsage = this.sharedService.findItemInListByName(list, resourceName).Quantity;
      res.push([
        r.Name,
        r.Tags,
        perUnitUsage,
        r.Quantity,
        r.Quantity * perUnitUsage
      ]);
    });

    const colNo = res[0].indexOf('total');
    res.push(['', '', '', 'Total', this.commonService.sumColumnOftable(res.slice(1), colNo)]);

    return res;
  }


}
