import { Component, OnInit } from '@angular/core';
import { AssetTypesEnum } from './../../models/enums/Types.enum';
import { WikiService } from './../../services/wiki.service';
import { IWikiEntity } from './../../models/Entity';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {

  inventoryItemsList: IWikiEntity[] = [];

  crewList: IWikiEntity[] = [];
  buildingsList: IWikiEntity[] = [];
  machinesList: IWikiEntity[] = [];

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
