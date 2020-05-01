import { IEntity } from './../../models/Entity';
import { IAsset, Asset } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { GameService } from 'src/app/services/game.service';
import { Component, OnInit } from '@angular/core';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { PowerService } from 'src/app/power-module/power.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataProviderService } from 'src/app/services/data-provider.service';

@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {
  Age: number;
  Name: string;
  Cash: IEntity;
  energyProduction: number;
  energyUsage: number;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private powerService: PowerService,
    private gameService: GameService,
    private financeService: FinanceService
  ) { }

  ngOnInit() {
    this.updateStatusBarData();

    this.gameService.IsTurnComputingEndedSubject.subscribe(s => {
      // if (s) {
      this.updateStatusBarData();
      // }
    });

  }

  updateStatusBarData() {
    this.Age = this.kolonyService.Kolony.Age;
    this.Name = this.kolonyService.Kolony.Name;
    this.Cash = this.financeService.Cash;
    this.energyProduction = this.powerService.totalEnergyProduction;
    this.energyUsage = this.powerService.totalEnergyUsage;
  }

  nextTurn() {
    this.gameService.nextTurn();
  }
}
