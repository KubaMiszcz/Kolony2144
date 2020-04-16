import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { GameService } from 'src/app/services/game.service';
import { KolonyService } from 'src/app/services/kolony.service';

@Component({
  selector: 'app-dev-tab',
  templateUrl: './dev-tab.component.html',
  styleUrls: ['./dev-tab.component.scss']
})
export class DevTabComponent implements OnInit, OnDestroy {
  playerNotes = '';

  constructor(
    private gameService: GameService,
    private kolonyService: KolonyService,
    private financeService: FinanceService
  ) {
  }

  ngOnInit(): void {
    this.gameService.PlayerNotesBS.subscribe(c => this.playerNotes = c);
  }

  ngOnDestroy(): void {
    this.gameService.PlayerNotes = this.playerNotes;
  }

  saveGame() {
    this.gameService.PlayerNotes = this.playerNotes;
    this.gameService.saveGame();
  }

  loadGame() {
    this.gameService.loadGame();
  }

  add10kSB() {
    const c = this.financeService.Cash;
    c.Quantity += 10000;
    this.financeService.Cash = c;
  }

}
