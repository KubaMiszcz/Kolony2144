import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MiningService {

  constructor() {
    // this.rawResources = this.kolony.RawResources;
    // this.allMobileExtractorsList = this.kolony.AllAssetsArray.filter(a => a.DetailedType === DetailedMachineTypes.OreExtractor);
    // console.log(this.allMobileExtractorsList);

    // // this.rawDepositsList=this.kolony.RawDeposits;
    // this.kolony.RawDeposits.forEach(d => {
    //   let rawItem = d.DetailedType;

    //   let attachedExtractors = this.allMobileExtractorsList.filter(e =>
    //     e.ProducedItems.filter(i => i.Name === rawItem)
    //   );

    //   let currentExtraction = 0;

    //   attachedExtractors.forEach(extractor =>
    //     extractor.ProducedItems.filter(i => i.Name === rawItem).forEach(p =>
    //       currentExtraction += p.Quantity * extractor.Quantity
    //     )
    //   );

    //   this.rawDepositsList.push({
    //     Deposit: d,
    //     AttachedExtractors: attachedExtractors,
    //     CurrentExtraction: currentExtraction
    //   })
    // });


    // this.freeMobileExtractorsList = this.allMobileExtractorsList.filter(a => a.ProducedItems.length === 0);
  }


}
