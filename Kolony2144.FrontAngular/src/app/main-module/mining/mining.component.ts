import { Component, OnInit } from '@angular/core';
import { IKolony } from 'src/app/models/Kolony';
import { IAsset, IInventoryItem } from 'src/app/models/Entity';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';
import { MiningService } from 'src/app/services/mining.service';
import { GameService } from 'src/app/services/game.service';
import { StarterMachines, MachinesNames } from 'src/app/models/Machine';
import { DetailedMachineTypes } from 'src/app/models/enums/Types.enum';

@Component({
  selector: 'app-mining',
  templateUrl: './mining.component.html',
  styleUrls: ['./mining.component.scss']
})
export class MiningComponent implements OnInit {
  kolony: IKolony;

  rawDepositsList: IDeposit[] = [];
  allMobileExtractorsList: IAsset[] = [];
  freeMobileExtractorsList: IAsset[] = [];

  rawResources: IInventoryItem[] = [];

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService,
    private miningService: MiningService,
    private gameService: GameService,

  ) {
    this.kolonyService.KolonyBS.subscribe(k => this.kolony = k);
  }

  ngOnInit() {
    this.rawResources = this.kolony.RawResources;
    this.allMobileExtractorsList = this.kolony.AllAssetsArray.filter(a => a.DetailedType === DetailedMachineTypes.OreExtractor);
    console.log(this.allMobileExtractorsList);

    // this.rawDepositsList=this.kolony.RawDeposits;
    this.kolony.RawDeposits.forEach(d => {
      let rawItem = d.DetailedType;
      let attachedExtractors = [];

      attachedExtractors = this.allMobileExtractorsList.filter(e =>
        e.ProducedItems.filter(i => i.Name === rawItem).length > 0
      );

      let currentExtraction = 0;

      attachedExtractors.forEach(extractor =>
        extractor.ProducedItems.filter(i => i.Name === rawItem).forEach(p =>
          currentExtraction += p.Quantity * extractor.Quantity
        )
      );

      this.rawDepositsList.push({
        Deposit: d,
        AttachedExtractors: attachedExtractors,
        CurrentExtraction: currentExtraction
      })
    });


    this.freeMobileExtractorsList = this.allMobileExtractorsList.filter(a => a.ProducedItems.length === 0);
  }

  attachExtractor(deposit: IDeposit, extractorName, qty: number) {
    console.log(deposit, extractorName, qty);
    let extFromPool = this.allMobileExtractorsList.find(e => e.Name === extractorName);
    let ext = deposit.AttachedExtractors.find(e => e.Name === extractorName)

    if (ext) {
      ext.Quantity += qty;
      extFromPool.Quantity -= qty;
    } else {
      ext = { ...extFromPool };
      ext.Quantity += qty;
      extFromPool.Quantity -= qty;
      this.rawDepositsList.find(d => d === deposit).AttachedExtractors.push(ext);
    }
  }

}

interface IDeposit {
  Deposit: IAsset;
  AttachedExtractors: IAsset[];
  CurrentExtraction: number;
}
