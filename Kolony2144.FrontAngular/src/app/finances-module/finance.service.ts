import { ResourceTypesEnum } from './../models/enums/Types.enum';
import { BuildingService } from './../buildings-module/building.service';
import { Injectable } from '@angular/core';
import { IAsset, IEntity } from '../models/Entity';
import { AssetService } from '../assets-module/asset.service';
import { ResourceName } from '../models/Resource';
import { GameService } from '../services/game.service';
import { KolonyService } from '../services/kolony.service';
import { OverviewService } from '../overview-module/overview.service';
import { CommonService } from '../services/common.service';
import { TradeService } from '../trade-module/trade.service';
import { WikiService } from '../wiki-module/wiki.service';
import { BehaviorSubject } from 'rxjs';
import { SharedService } from '../services/shared.service';
import { EntityService } from '../services/entity.service';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  cashConsumers: IEntity[] = [];
  Cash: IEntity;

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private entityService: EntityService,
    private assetService: AssetService,
    private kolonyService: KolonyService,
  ) {
    this.cashConsumers = this.entityService.getEntitiesByConsumedAssetNameFromList(ResourceName.Cash);
    this.Cash = this.entityService.getEntityByName(ResourceName.Cash);
  }

  get totalCashConsumption() {
    return this.entityService.getEntityConsumptionQtyByName(ResourceName.Cash);
  }

}

