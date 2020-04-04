import { KolonyService } from './services/kolony.service';
import { IKolony } from './models/Kolony';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kolony2144';
  kolony: IKolony;
  kolonytxt: string;

  constructor(
    private kolonyService: KolonyService
  ) {
    this.kolony = this.kolonyService.kolony;
  }
}
