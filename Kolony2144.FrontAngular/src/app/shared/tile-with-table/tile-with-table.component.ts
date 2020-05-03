import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tile-with-table',
  templateUrl: './tile-with-table.component.html',
  styleUrls: ['./tile-with-table.component.scss']
})
export class TileWithTableComponent implements OnInit {
  cardid: any;
  collapse: boolean;
  @Input() caption = '';
  @Input() header: any[] = [];
  @Input() rows: any[][] = [];
  // @Input() footer: any[] = [];

  constructor() {
  }

  ngOnInit() {
    this.cardid = this.caption.replace(/ /gi, '-');
  }

  // toggle() {
  //   this.chevron = this.chevron === 'fa-chevron-down' ? 'fa-chevron-right' : 'fa-chevron-up';
  //   return this.chevron;
  // }

}
