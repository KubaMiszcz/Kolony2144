import { GameService } from './../../services/game.service';
import { Component, OnInit } from '@angular/core';
import { ICountableEntity } from 'src/app/models/Entity';

@Component({
  selector: 'app-construction-panel',
  templateUrl: './construction-panel.component.html',
  styleUrls: ['./construction-panel.component.scss']
})
export class ConstructionPanelComponent implements OnInit {
  allBuildingsList: ICountableEntity[] = [];

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.allBuildingsList = this.gameService.allGameBuildings;
  }

}
