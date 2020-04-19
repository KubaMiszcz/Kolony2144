import { Injectable } from '@angular/core';
import { Kolony, IKolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, Asset, IEntity } from '../models/Entity';
import { AllCivilianCrew } from '../models/Crew';
import { AllBuildings, IBuilding } from '../models/Building';
import { AllMachines } from '../models/Machine';
import { CommonService } from './common.service';
import { CrewService } from '../crew-module/crew.service';
import { FinanceService } from '../finances-module/finance.service';
import { GameService } from './game.service';
import { OverviewService } from '../overview-module/overview.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { AssetService } from '../assets-module/asset.service';
import { GenericTypesEnum } from '../models/enums/Types.enum';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class KolonyService {

  Kolony: Kolony;

  // todo move age to kolony and kolony to gameservice
  // private age = 100;
  // get Age(): number { return Math.round(this.age * 10) / 10; }
  // set Age(value: number) { this.age = value; this.AgeBS.next(value); }
  // AgeBS = new BehaviorSubject<number>(100);

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.InitNewKolony();
  }

  getAllKolonyEntities(): IEntity[] {
    return [
      ...this.Kolony.Assets,
      ...this.Kolony.Buildings
    ];
  }


  getKolonyState(): IKolony {
    return this.Kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }

  //#region init new kolony
  InitNewKolony() {
    this.Kolony = new Kolony();
    this.Kolony.Age = 100;
    this.Kolony.Name = 'KolonyUNO';
    this.Kolony.Assets = this.fillInitialKolonyAssets();
    this.Kolony.Buildings = this.fillInitialKolonyBuildings();
  }

  fillInitialKolonyAssets(): IAsset[] {
    const res: IAsset[] = [];
    [...AllResources, ...AllCivilianCrew, ...AllMachines]
      .filter(a => a.Quantity > 0 || a.Tags.includes(GenericTypesEnum.Property))
      .forEach(i => {
        res.push(i as IAsset);
        // res.push(new Asset().Deserialize(i));
      });

    return res;
  }

  fillInitialKolonyBuildings(): IBuilding[] {
    const res: IBuilding[] = [];
    [...AllBuildings]
      .filter(a => a.Quantity > 0)
      .forEach(i => {
        res.push(i as IBuilding);
      });

    return res;
  }

}
