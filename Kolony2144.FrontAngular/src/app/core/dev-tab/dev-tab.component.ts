import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { GameService } from 'src/app/services/game.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-dev-tab',
  templateUrl: './dev-tab.component.html',
  styleUrls: ['./dev-tab.component.scss']
})
export class DevTabComponent implements OnInit, OnDestroy {
  playerNotes = '';

  constructor(
    private gameService: GameService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private financeService: FinanceService
  ) {
  }

  ngOnInit(): void {
    this.playerNotes = this.dataProviderService.PlayerNotes;
  }

  ngOnDestroy(): void {
    this.dataProviderService.PlayerNotes = this.playerNotes;
  }

  saveGame() {
    // this.gameService.PlayerNotesDEPR = this.playerNotes;
    // this.gameService.saveGame();
  }

  loadGame() {
    // this.gameService.loadGame();
  }

  add10kSB() {
    // const c = this.financeService.Cash;
    // c.Quantity += 10000;
    // this.financeService.Cash = c;
  }

}
