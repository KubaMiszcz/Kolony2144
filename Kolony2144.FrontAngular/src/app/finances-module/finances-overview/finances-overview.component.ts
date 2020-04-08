import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';

@Component({
  selector: 'app-finances-overview',
  templateUrl: './finances-overview.component.html',
  styleUrls: ['./finances-overview.component.scss']
})
export class FinancesOverviewComponent implements OnInit {
  kolony: Kolony;

  constructor(
    private kolonyService: KolonyService,
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit(): void {
  }

}
