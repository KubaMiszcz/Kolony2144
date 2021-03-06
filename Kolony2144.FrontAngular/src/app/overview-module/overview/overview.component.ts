import { OverviewService } from '../overview.service';
import { EntityTypesEnum, GenericTypesEnum } from 'src/app/models/enums/Types.enum';
import { IAsset, IEntity, ITradeableEntity } from './../../models/Entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { Kolony } from 'src/app/models/Kolony';
import { GameService } from 'src/app/services/game.service';
import { AssetService } from 'src/app/assets-module/asset.service';
import { CommonService } from 'src/app/services/common.service';
import { SharedService } from 'src/app/services/shared.service';
import { DataProviderService } from 'src/app/services/data-provider.service';
import { ResourceName } from 'src/app/models/Resource';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  news: string[] = [];
  allAssetsTableRows: any[];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private dataProviderService: DataProviderService,
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private gameService: GameService,
    private assetService: AssetService,
  ) {
  }

  ngOnInit() {
    this.news = this.overviewService.News;
    this.allAssetsTableRows = this.fillSummaryTableRows(this.dataProviderService.ALL_TRADEABLE_ASSETS_LIST);
  }


  fillSummaryTableRows(entities: IAsset[]) {
    const res: any[][] = [
      ['name', 'type', 'qty', 'price', 'RarityFactor']
    ];

    entities.forEach(rr => {
      const r = rr as ITradeableEntity;
      res.push([
        r.Name,
        r.Type,
        r.Quantity,
        r.Price,
        r.RarityFactor
      ]);
    });

    return res;
  }

}
