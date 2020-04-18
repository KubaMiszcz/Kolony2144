import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from '../assets-module/asset.service';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { KolonyService } from '../services/kolony.service';
import { OverviewService } from '../overview-module/overview.service';
import { FinanceService } from '../finances-module/finance.service';
import { GameService } from '../services/game.service';
import { CommonService } from '../services/common.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crewList: IAsset[];

  constructor(
    private commonService: CommonService,
    private assetService: AssetService,
  ) {
    this.crewList = this.assetService.getAssetsByType(AssetTypesEnum.Crew);
  }

  getAllCrewQuantity() {
    return this.getAllCrew()
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getAllCrew(): IAsset[] {
    return this.crewList;
  }

}
