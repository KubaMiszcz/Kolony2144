import { IInventoryItem } from 'src/app/models/Entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IKolony } from '../models/Kolony';
import { KolonyService } from './kolony.service';
import { Router } from '@angular/router';
import { TradeService } from './trade.service';
import { ProcessingPhasesNames } from '../models/enums/Types.enum';
import { IAsset } from '../models/Entity';
import { StarterCivilianCrew } from '../models/Crew';
import { StarterMachines } from '../models/Machine';
import { StarterBuildings } from '../models/Building';
import { StarterInventoryItems } from '../models/InventoryItem';
import { PowerService } from './power.service';
import { ProductionService } from './production.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  gameNotes = '';// = new BehaviorSubject<string>('');
  isTurnComputing = new BehaviorSubject<boolean>(false);
  kolony: IKolony;
  AllAssets: IAsset[];
  AllInventoryItems: IInventoryItem[];

  constructor(
    private router: Router,
    private kolonyService: KolonyService,
    private productionService: ProductionService,
    private powerService: PowerService,
    private tradeService: TradeService
  ) {
    this.AllAssets = JSON.parse(JSON.stringify([...StarterCivilianCrew, ...StarterMachines, ...StarterBuildings]));
    this.AllAssets.forEach(a => a.Quantity = 0);
    this.AllInventoryItems = JSON.parse(JSON.stringify([...StarterInventoryItems]));
    this.AllInventoryItems.forEach(a => a.Quantity = 0);

    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
    this.nextTurn();
  }

  nextTurn() {
    console.log('nextTurn');
    this.router.navigate(['/loading-screen']);
    setTimeout(() => {
      this.router.navigate(['/start']);
    }, 400);
  }

  setNextMonth() {
    this.kolony.Age += 0.1;
  }

  setPlayerNotes(value) {
    // this.gameNotes.next(value);
  }

  SaveGame() {
    sessionStorage.setItem('kolony', JSON.stringify(this.kolonyService.KolonyBS.value));
  }



}


