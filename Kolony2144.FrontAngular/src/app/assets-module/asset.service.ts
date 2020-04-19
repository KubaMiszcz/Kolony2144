import { SharedService } from './../services/shared.service';
import { Injectable } from '@angular/core';
import { KolonyService } from '../services/kolony.service';
import { IAsset, ISimplifiedEntity, IEntity } from '../models/Entity';
import { ResourceTypesEnum, AssetTypesEnum } from '../models/enums/Types.enum';
import { Kolony } from '../models/Kolony';
import { ResourceName } from '../models/Resource';
import { OverviewService } from '../overview-module/overview.service';
import { CrewService } from '../crew-module/crew.service';
import { FinanceService } from '../finances-module/finance.service';
import { GameService } from '../services/game.service';
import { CommonService } from '../services/common.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { UoMsEnum } from '../models/enums/UoMs.enum';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  allKolonyAssetList: IAsset[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
  ) {
    this.allKolonyAssetList = this.kolonyService.AllAssets;
  }


  getAssetByName(name: string): IAsset {
    return this.allKolonyAssetList.find(i => i.Name === name);
  }





  getVolatileAssets(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Price === undefined);
  }

  ClearVolatileAssets() {
    this.getVolatileAssets().forEach(element => element.Quantity = 0);
  }




















  // ==========================
  // check if not deprecated






  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////

  getAllResourcesDEPR(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === AssetTypesEnum.Resource);
  }



  getAssetsByTypeDEPR(type: AssetTypesEnum): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === type);
  }


  addNewAssetToInventoryDEPR(newAsset: IAsset): IAsset {
    const asset = this.commonService.cloneObject(newAsset) as IAsset;
    asset.Quantity = 0;
    asset.Price = 0;
    this.allKolonyAssetList.push(asset);

    return asset;
  }




}
