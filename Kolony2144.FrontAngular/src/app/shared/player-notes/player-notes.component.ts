import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-player-notes',
  templateUrl: './player-notes.component.html',
  styleUrls: ['./player-notes.component.scss']
})
export class PlayerNotesComponent implements OnInit, OnDestroy {
  playerNotes = '';

  constructor(
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.playerNotes = this.gameService.loadPlayerNotes();
  }

  ngOnDestroy(): void {
    this.gameService.savePlayerNotes(this.playerNotes);
  }

}
