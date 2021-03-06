import { IWikiEntity } from './../../models/Entity';
import { Component, OnInit } from '@angular/core';
import { EntityTypesEnum } from './../../models/enums/Types.enum';
import { WikiService } from '../wiki.service';

@Component({
  selector: 'app-wiki',
  templateUrl: './wiki.component.html',
  styleUrls: ['./wiki.component.scss']
})
export class WikiComponent implements OnInit {
  // todo szukajka dynamiczna filtrowanie entities
  inventoryItemsList: IWikiEntity[] = [];

  crewList: IWikiEntity[] = [];
  buildingsList: IWikiEntity[] = [];
  machinesList: IWikiEntity[] = [];

  constructor(
    private wikiService: WikiService
  ) {
    const list = this.wikiService.allWikiEntites;
    this.inventoryItemsList = list.filter(i => i.Type === EntityTypesEnum.Resource);
    this.crewList = list.filter(i => i.Type === EntityTypesEnum.Crew);
    this.buildingsList = list.filter(i => i.Type === EntityTypesEnum.Building);
    this.machinesList = list.filter(i => i.Type === EntityTypesEnum.Machine);
  }

  ngOnInit() {
  }

}
