import { SharedService } from '../../services/shared.service';
import { IAsset } from '../../models/Entity';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-queue-asset-tile',
  templateUrl: './queue-asset-tile.component.html',
  styleUrls: ['./queue-asset-tile.component.scss']
})
export class QueueAssetTileComponent implements OnInit {
  @Input() asset: IAsset;

  constructor(
  ) { }

  ngOnInit() {
  }

}
