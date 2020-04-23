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

  constructor(
    private wikiService: WikiService
  ) { }

  ngOnInit() {
    this.imgUrl = this.wikiService.getImgUrlByName(this.entity.Name);
  }

}
