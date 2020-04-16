import { IAsset, Asset } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { PowerService } from 'src/app/power-module/power.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  Age: number;
  Name: string;
  Cash: IAsset = new Asset();
  energyProduction: number;
  energyUsage: number;

  constructor(
    private kolonyService: KolonyService,
    private powerService: PowerService,
    private gameService: GameService,
    private financeService: FinanceService
  ) {
    this.gameService.AgeBS.subscribe(c => this.Age = c);
    this.Name = this.kolonyService.Name;

    this.financeService.CashBS.subscribe(c => this.Cash = c);

    this.energyProduction = this.powerService.getEnergyProduction();
    this.energyUsage = this.powerService.getEnergyUsage();
  }

  ngOnInit() {
  }

  nextTurn() {
    this.gameService.nextTurn();
    // TODO make it subject and subscribe
    this.Age = this.gameService.Age;
    this.Name = this.kolonyService.Name;
    this.energyProduction = this.powerService.getEnergyProduction();
    this.energyUsage = this.powerService.getEnergyUsage();
  }
}
