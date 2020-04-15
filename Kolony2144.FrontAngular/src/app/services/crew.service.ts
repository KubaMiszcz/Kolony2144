import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from './asset.service';
import { AssetTypesEnum } from '../models/enums/Types.enum';
import { KolonyService } from './kolony.service';
import { OverviewService } from './overview.service';
import { PowerService } from './power.service';
import { FinanceService } from './finance.service';
import { GameService } from './game.service';
import { SharedService } from './shared.service';
import { TradeService } from './trade.service';
import { WikiService } from './wiki.service';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crewList: IAsset[];

  constructor(
    private sharedService: SharedService,
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
