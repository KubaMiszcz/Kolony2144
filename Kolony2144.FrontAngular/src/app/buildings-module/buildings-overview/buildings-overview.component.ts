import { IBuilding } from './../../models/Building';
import { Component, OnInit } from '@angular/core';
import { BuildingService } from 'src/app/buildings-module/building.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { ResourceName } from 'src/app/models/Resource';
import { IAsset, ICountableEntity } from 'src/app/models/Entity';
import { GameService } from 'src/app/services/game.service';

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
    private sharedService: SharedService,
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
