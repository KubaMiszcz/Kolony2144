import { Injectable } from '@angular/core';
import { IAsset } from '../models/Entity';
import { AssetService } from './asset.service';
import { AssetTypesEnum } from '../models/enums/Types.enum';

@Injectable({
  providedIn: 'root'
})
export class CrewService {
  private crewList: IAsset[]

  constructor(
    private assetService: AssetService,
  ) {
    this.crewList = this.assetService.getKolonyAssetsByType(AssetTypesEnum.Crew);
  }

  getAllCrewQuantity() {
    return this.getAllCrew()
      .map(crew => crew.Quantity)
      .reduce((acc, next) => acc + next);
  }

  getAllCrew(): IAsset[] {
    return this.crewList;
  }

}
