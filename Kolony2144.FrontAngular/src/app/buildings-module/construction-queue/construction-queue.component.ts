import { Component, OnInit } from '@angular/core';
import { IEntity } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { EntityService } from 'src/app/services/entity.service';
import { AssetService } from 'src/app/assets-module/asset.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-construction-queue',
  templateUrl: './construction-queue.component.html',
  styleUrls: ['./construction-queue.component.scss']
})
export class ConstructionQueueComponent implements OnInit {
  productionQueue: IEntity[] = [];

  constructor(
    private commonService: CommonService,
    private entityService: EntityService,
    private assetService: AssetService,
    private kolonyService: KolonyService,
  ) { }

  ngOnInit(): void {
    this.entityService.ProductionQueueEmitter.subscribe(() =>
      this.productionQueue = this.entityService.productionQueue);
  }

}
