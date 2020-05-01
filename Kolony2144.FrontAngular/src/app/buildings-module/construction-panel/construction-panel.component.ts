import { IBuilding } from 'src/app/models/Building';
import { BuildingService } from './../building.service';
import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/Entity';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { KolonyService } from 'src/app/services/kolony.service';

@Component({
  selector: 'app-construction-panel',
  templateUrl: './construction-panel.component.html',
  styleUrls: ['./construction-panel.component.scss']
})
export class ConstructionPanelComponent implements OnInit {
  allBuildingsList: IBuilding[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private buildingService: BuildingService
  ) { }

  ngOnInit(): void {
    this.allBuildingsList = this.dataProviderService.ALL_BUILDINGS_LIST;
  }

}
