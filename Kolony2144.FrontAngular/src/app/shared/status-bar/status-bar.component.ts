import { Component, OnInit } from '@angular/core';
import { IKolony, Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  kolony: Kolony;
  kolonyEnergyProduction: number;
  kolonyEnergyUsage: number;

  constructor(
    private kolonyService: KolonyService,
    private gameService: GameService,
  ) {
    this.kolony = this.kolonyService.kolony;
    this.kolonyEnergyProduction = this.kolonyService.GetEnergyProduction;
    this.kolonyEnergyUsage = this.kolonyService.GetEnergyUsage;
  }

  ngOnInit() {
  }

  nextTurn() {
    this.gameService.nextTurn();
    // this.kolonyEnergyProduction = this.kolonyService.kolonyEnergyProduction;
    // this.kolonyEnergyUsage = this.kolonyService.kolonyEnergyUsage;
    // this.gameService.SaveGame();
  }
}
