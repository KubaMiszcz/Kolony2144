import { Component, OnInit } from '@angular/core';
import { IKolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  kolony: IKolony;

  constructor(
    private kolonyService: KolonyService,
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit() {

  }

  nextTurn() {
    console.log('nexturn');

    // this.gameService.nextTurn();
    // this.gameService.SaveGame();
  }
}
