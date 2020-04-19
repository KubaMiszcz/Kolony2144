import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from '../assets-module/asset.service';
import { EntityTypesEnum } from '../models/enums/Types.enum';
import { KolonyService } from '../services/kolony.service';
import { OverviewService } from '../overview-module/overview.service';
import { FinanceService } from '../finances-module/finance.service';
import { GameService } from '../services/game.service';
import { CommonService } from '../services/common.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { DataProviderService } from '../services/data-provider.service';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  CrewList: IAsset[];

  constructor(
    private commonService: CommonService,
    private assetService: AssetService,
    private dataProviderService: DataProviderService
  ) {
    this.CrewList = this.dataProviderService.ALL_CREW_LIST;
  }

  getAllCrewQuantity() {
    return this.CrewList
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getAllCrewDEPR(): IAsset[] {
    return this.CrewList;
  }

}
