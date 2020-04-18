import { Injectable } from '@angular/core';
import { Kolony, IKolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, Asset } from '../models/Entity';
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

@Injectable({
  providedIn: 'root'
})
export class KolonyService {
  private kolony: Kolony;
  get Name(): string { return this.kolony.Name; }

  constructor(
    private commonService: CommonService,
  ) {
    const kolony = new Kolony();
    kolony.Name = 'KolonyUNO';
    kolony.Assets = this.setInitialKolonyAssets();
    kolony.Buildings = this.setInitialKolonyBuildings();
    this.kolony = kolony;
  }

  getAllKolonyAssets(): IAsset[] { return this.kolony.Assets; }

  getAllKolonyBuildings(): IBuilding[] { return this.kolony.Buildings; }


  setInitialKolonyAssets(): IAsset[] {
    const res: IAsset[] = [];
    [...AllResources, ...AllCivilianCrew, ...AllMachines]
      .filter(a => a.Quantity > 0 || a.Tags.includes(GenericTypesEnum.Property))
      .forEach(i => {
        res.push(new Asset().Deserialize(i));
      });

    return res;
  }

  setInitialKolonyBuildings(): IBuilding[] {
    const res: IBuilding[] = [];
    [...AllBuildings]
      .filter(a => a.Quantity > 0)
      .forEach(i => {
        res.push(new Asset().Deserialize(i));
      });

    return res;
  }

  getKolonyState(): IKolony {
    return this.kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }


}
