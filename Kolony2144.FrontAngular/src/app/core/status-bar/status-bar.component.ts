import { KolonyService } from 'src/app/services/kolony.service';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit } from '@angular/core';
import { PowerService } from './../../services/power.service';
import { FinanceService } from 'src/app/services/finance.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  Age: number;
  Name: string;
  Cash: number;
  energyProduction: number;
  energyUsage: number;

  constructor(
    private KolonyService: KolonyService,
    private powerService: PowerService,
    private gameService: GameService,
    private financeService: FinanceService
  ) {
    this.Age = this.KolonyService.getAge();
    this.Name = this.KolonyService.getName();
    this.Cash = this.financeService.getCashQuantity();
    this.energyProduction = this.powerService.getEnergyProduction();
    this.energyUsage = this.powerService.getEnergyUsage();
  }

  ngOnInit() {
  }

  nextTurn() {
    this.gameService.nextTurn();
    //TODO make it subject
    this.Age = this.KolonyService.getAge();
    this.Name = this.KolonyService.getName();
    this.Cash = this.financeService.getCashQuantity();
    this.energyProduction = this.powerService.getEnergyProduction();
    this.energyUsage = this.powerService.getEnergyUsage();
    // this.kolonyEnergyProduction = this.kolonyService.kolonyEnergyProduction;
    // this.kolonyEnergyUsage = this.kolonyService.kolonyEnergyUsage;
    // this.gameService.SaveGame();
  }
}
