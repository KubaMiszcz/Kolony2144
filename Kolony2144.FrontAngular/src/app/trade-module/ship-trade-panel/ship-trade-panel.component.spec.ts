import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipTradePanelComponent } from './ship-trade-panel.component';

describe('ShipTradePanelComponent', () => {
  let component: ShipTradePanelComponent;
  let fixture: ComponentFixture<ShipTradePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShipTradePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipTradePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
