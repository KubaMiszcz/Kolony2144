import { IFullEntity } from './../../models/Entity';
import { Component, OnInit } from '@angular/core';
import { AssetTypesEnum } from './../../models/enums/Types.enum';
import { WikiService } from './../../services/wiki.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {

  inventoryItemsList: IFullEntity[] = [];

  crewList: IFullEntity[] = [];
  buildingsList: IFullEntity[] = [];
  machinesList: IFullEntity[] = [];

  constructor(
    private wikiService: WikiService
  ) {
    const list = this.wikiService.allWikiEntites;
    this.inventoryItemsList = list.filter(i => i.Type === AssetTypesEnum.Resource);
    this.crewList = list.filter(i => i.Type === AssetTypesEnum.Crew);
    this.buildingsList = list.filter(i => i.Type === AssetTypesEnum.Building);
    this.machinesList = list.filter(i => i.Type === AssetTypesEnum.Machine);
  }

  ngOnInit() {
  }

}
