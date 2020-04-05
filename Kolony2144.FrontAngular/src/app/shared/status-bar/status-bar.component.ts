import { PowerService } from './../../services/power.service';
import { Component, OnInit } from '@angular/core';
import { IKolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  kolony: IKolony;
  powerStatus: number[];

  constructor(
    private kolonyService: KolonyService,
    private powerService: PowerService,
    private gameService: GameService
  ) {
    this.kolonyService.KolonyBS.subscribe(d => this.kolony = d);
    this.powerService.powerStatusBS.subscribe(d => this.powerStatus = d);
  }

  ngOnInit() {

  }

  nextTurn() {
    console.log('nextrurn');

    this.gameService.nextTurn();
    // this.gameService.SaveGame();
  }
}
