import { Component, OnInit } from '@angular/core';
import { Kolony } from 'src/app/models/Kolony';
import { KolonyService } from 'src/app/services/kolony.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-power-overview',
  templateUrl: './power-overview.component.html',
  styleUrls: ['./power-overview.component.css']
})
export class PowerOverviewComponent implements OnInit {
  kolony: Kolony;

  constructor(
    private kolonyService: KolonyService,
    private sharedService: SharedService
  ) {
    this.kolony = this.kolonyService.kolony;
  }

  ngOnInit(): void {
  }

}
