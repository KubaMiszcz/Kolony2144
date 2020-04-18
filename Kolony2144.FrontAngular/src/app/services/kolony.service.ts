import { Injectable } from '@angular/core';
import { Kolony, IKolony } from '../models/Kolony';
import { AllResources, ResourceName as ResourceName } from '../models/Resource';
import { IAsset, Asset, ICountableEntity } from '../models/Entity';
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

  private kolony: Kolony;
  get Name(): string { return this.kolony.Name; }

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
  ) {
    this.InitNewKolony();
  }

  getAllKolonyEntities(): ICountableEntity[] {
    return [
      ...this.kolony.Assets,
      ...this.kolony.Buildings
    ];
  }

  getAllKolonyAssets(): IAsset[] { return this.kolony.Assets; }

  getAllKolonyBuildings(): IBuilding[] { return this.kolony.Buildings; }


  getKolonyState(): IKolony {
    return this.kolony;
  }

  setKolonyState(kolony: Kolony) {
    // this.kolony = kolony as Kolony;
  }

  //#region init new kolony
  InitNewKolony() {
    this.kolony = new Kolony();
    this.kolony.Name = 'KolonyUNO';
    this.kolony.Assets = this.fillInitialKolonyAssets();
    this.kolony.Buildings = this.fillInitialKolonyBuildings();
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



  // this.cashConsumers = this.assetService.getEntitiesByConsumedAssetName(ResourceName.Cash);


  //#endregion


}
