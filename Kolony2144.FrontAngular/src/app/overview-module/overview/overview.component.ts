import { OverviewService } from './../../services/overview.service';
import { AssetTypesEnum } from 'src/app/models/enums/Types.enum';
import { IAsset } from './../../models/Entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';
import { Kolony } from 'src/app/models/Kolony';
import { GameService } from 'src/app/services/game.service';
import { AssetService } from 'src/app/services/asset.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit, OnDestroy {
  news: string[] = [];
  playerNotes = '';
  resourcesList: any[];

  constructor(
    private kolonyService: KolonyService,
    private overviewService: OverviewService,
    private gameService: GameService,
    private assetService: AssetService,
  ) {
  }

  ngOnInit() {
    this.news = this.overviewService.News;
    this.gameService.PlayerNotesBS.subscribe(c => this.playerNotes = c);
    this.resourcesList = this.fillResourcesList(this.assetService.getAllResources());
  }

  ngOnDestroy(): void {
    this.gameService.PlayerNotes = this.playerNotes;
  }

  fillResourcesList(resources: IAsset[]): any[] {
    const res = [['name', 'qty'],
    ...resources.map(r => [r.Name, r.Quantity])
    ];
    return res;
  }

}
