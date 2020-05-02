import { CommonService } from './../../services/common.service';
import { WikiService } from './../../wiki-module/wiki.service';
import { SharedService } from '../../services/shared.service';
import { IAsset, IEntity } from '../../models/Entity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-queue-entity-tile',
  templateUrl: './queue-entity-tile.component.html',
  styleUrls: ['./queue-entity-tile.component.scss']
})
export class QueueEntityTileComponent implements OnInit {
  @Input() entity: IEntity;
  imgUrl = '';
  percentProgress: number;
  remainPcs: number;

  constructor(
    private commonService: CommonService,
    private wikiService: WikiService
  ) { }

  ngOnInit() {
    this.imgUrl = this.wikiService.getImgUrlByName(this.entity.Name);
    this.remainPcs = Math.ceil(this.entity.Quantity);
    const currentProgress = this.remainPcs - this.entity.Quantity;
    this.percentProgress = this.commonService.ConvertToPercents(currentProgress / this.remainPcs, 2);
  }

}
