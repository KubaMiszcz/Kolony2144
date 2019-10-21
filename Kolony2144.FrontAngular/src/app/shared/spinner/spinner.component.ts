import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class AppSpinnerComponent implements OnInit {
  @Input() line1: '';
  @Input() line2: '';
  @Input() line3: '';

  constructor() { }

  ngOnInit() {
  }

}
