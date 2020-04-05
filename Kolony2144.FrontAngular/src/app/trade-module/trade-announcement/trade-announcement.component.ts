import { TradeService, ITradeAnnouncement } from './../../services/trade.service';
import { Component, OnInit } from '@angular/core';
import { KolonyService } from 'src/app/services/kolony.service';

@Component({
  selector: 'app-trade-announcement',
  templateUrl: './trade-announcement.component.html',
  styleUrls: ['./trade-announcement.component.scss']
})
export class TradeAnnouncementComponent implements OnInit {
  tradeAnnouncement: ITradeAnnouncement;

  constructor(private tradeService: TradeService) { }

  ngOnInit() {
    // this.tradeAnnouncement = this.tradeService.setTradeAnnouncement();
    this.tradeAnnouncement = this.tradeService.tradeAnnouncement;
    console.log('from component', this.tradeAnnouncement);
  }
}

// export const ta: ITradeAnnouncement = {
//   shipName: "Star Gazer", companyName: "Hercules Corp", originPlanetName: "Thibadus", destinationPlanetName: "Chuitera"
// }
