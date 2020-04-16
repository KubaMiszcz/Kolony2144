import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-buildings-overview',
  templateUrl: './buildings-overview.component.html',
  styleUrls: ['./buildings-overview.component.scss']
})
export class BuildingsOverviewComponent implements OnInit {
  buildingsList: any[] = [];

  constructor(

  ) {
  }

  ngOnInit() {
  }

}
