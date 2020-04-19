import { OverviewService } from '../overview.service';
import { AssetTypesEnum, GenericTypesEnum } from 'src/app/models/enums/Types.enum';
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
export class OverviewComponent implements OnInit, OnDestroy {
  news: string[] = [];
  playerNotes = '';
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
    this.playerNotes = this.dataProviderService.PlayerNotes;

    this.allAssetsTableRows = this.fillSummaryTableRows(this.dataProviderService.ALL_TRADEABLE_ASSETS_LIST);
  }

  ngOnDestroy(): void {
    this.dataProviderService.PlayerNotes = this.playerNotes;
  }

  fillSummaryTableRows(entities: IAsset[]) {
    const res: any[][] = [
      ['name', 'type', 'qty', 'price']
    ];

    entities.forEach(rr => {
      const r = rr as ITradeableEntity;
      res.push([
        r.Name,
        r.Type,
        r.Quantity,
        r.Price,
        // r.CommonnessFactor
      ]);
    });

    return res;
  }

}
