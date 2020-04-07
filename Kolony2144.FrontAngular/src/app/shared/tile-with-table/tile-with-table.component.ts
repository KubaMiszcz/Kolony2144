import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile-with-table',
  templateUrl: './tile-with-table.component.html',
  styleUrls: ['./tile-with-table.component.scss']
})
export class TileWithTableComponent implements OnInit {
  @Input() caption = '';
  @Input() header: any[] = [];
  @Input() rows: any[][] = [];
  @Input() footer: any[] = [];

  constructor() { }

  ngOnInit() { }

}
