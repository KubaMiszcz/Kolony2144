import { EntityService } from './../../services/entity.service';
import { IEntity } from './../../models/Entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FinanceService } from 'src/app/finances-module/finance.service';
import { GameService } from 'src/app/services/game.service';
import { KolonyService } from 'src/app/services/kolony.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { IKolony } from 'src/app/models/Kolony';

@Component({
  selector: 'app-dev-tab',
  templateUrl: './dev-tab.component.html',
  styleUrls: ['./dev-tab.component.scss']
})
export class DevTabComponent implements OnInit {
  kolony: IKolony;
  entities: IEntity[] = [];
  selectedEntity: IEntity;

  constructor(
    private gameService: GameService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private financeService: FinanceService,
    private entityService: EntityService,
  ) {
  }

  ngOnInit(): void {
    this.kolony = this.kolonyService.Kolony;
    this.entities = this.entityService.allKolonyEntitiesList;
    this.selectedEntity = this.entities[0];
  }

  addQty(val: any) {
    this.selectedEntity.Quantity += parseFloat(val);
  }

  setQty(val: any) {
    this.selectedEntity.Quantity = parseFloat(val);
  }

  saveGame() {
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
