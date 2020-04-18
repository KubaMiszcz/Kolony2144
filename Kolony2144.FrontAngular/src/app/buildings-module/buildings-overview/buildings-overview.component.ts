import { Component, OnInit } from '@angular/core';
import { ICountableEntity } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { CommonService } from 'src/app/services/common.service';
import { BuildingService } from '../building.service';
import { GameService } from 'src/app/services/game.service';
import { IBuilding } from 'src/app/models/Building';

@Component({
  selector: 'app-buildings-overview',
  templateUrl: './buildings-overview.component.html',
  styleUrls: ['./buildings-overview.component.scss']
})
export class BuildingsOverviewComponent implements OnInit {
  kolonyBuildingsList: any[] = [];
  allBuildingsList: ICountableEntity[] = [];

  constructor(
    private kolonyService: KolonyService,
    private commonService: CommonService,
    private buildingService: BuildingService,
    private gameService: GameService,
  ) { }

  ngOnInit(): void {
    this.kolonyBuildingsList = this.fillBuildingsList(this.buildingService.kolonyBuildingsList);
    this.allBuildingsList = this.gameService.ALL_BUILDINGS_LIST;
  }

  fillBuildingsList(resources: IBuilding[]): any[] {
    const res: any[] = [['name', 'qty']];

    resources.forEach(r => {
      res.push([
        r.Name,
        r.Quantity
      ]);
    });

    return res;
  }


}
