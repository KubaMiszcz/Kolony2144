import { Injectable } from '@angular/core';
import { Kolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, Asset } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { SharedService } from './shared.service';
import { CrewService } from './crew.service';
import { FinanceService } from './finance.service';
import { GameService } from './game.service';
import { OverviewService } from './overview.service';
import { PowerService } from './power.service';
import { TradeService } from './trade.service';
import { WikiService } from './wiki.service';
import { AssetService } from './asset.service';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  private kolony: Kolony;
  get Name(): string { return this.kolony.Name; }

  constructor(
    private assetService: AssetService,
    private crewService: CrewService,
    private financeService: FinanceService,
    private gameService: GameService,
    private overviewService: OverviewService,
    private powerService: PowerService,
    private sharedService: SharedService,
    private tradeService: TradeService,
    private wikiService: WikiService,
  ) {
    let kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Assets = this.setInitialKolonyAssets();
    this.kolony = kolony;
  }

  getAllKolonyAssets(): IAsset[] { return this.kolony.Assets }


  setInitialKolonyAssets(): IAsset[] {
    let res: IAsset[] = [];
    [...AllResources, ...AllCivilianCrew, ...AllBuildings, ...AllMachines]
      .filter(a => a.Quantity > 0)
      .forEach(i => {
        res.push(new Asset().Deserialize(i));
      });
    return res;
  }

}
