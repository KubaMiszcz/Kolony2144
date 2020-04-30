import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { EntityTypesEnum } from '../models/enums/Types.enum';
import { CommonService } from '../services/common.service';
import { KolonyService } from '../services/kolony.service';
import { SharedService } from './../services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AssetService {
  allKolonyAssetList: IAsset[] = [];

  constructor(
    private commonService: CommonService,
    private sharedService: SharedService,
    private kolonyService: KolonyService,
  ) {
    this.kolonyService.AllAssetsBS.subscribe(data => this.allKolonyAssetList = data);
  }





  getAssetByName(name: string): IAsset {
    return this.allKolonyAssetList.find(i => i.Name === name);
  }




  getVolatileAssets(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Price === undefined);
  }

  ClearVolatileAssets() {
    this.getVolatileAssets().forEach(element => element.Quantity = 0);
  }




















  // ==========================
  // check if not deprecated






  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////
  /////////////////////////

  getAllResourcesDEPR(): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === EntityTypesEnum.Resource);
  }



  getAssetsByTypeDEPR(type: EntityTypesEnum): IAsset[] {
    return this.allKolonyAssetList.filter(i => i.Type === type);
  }






}
