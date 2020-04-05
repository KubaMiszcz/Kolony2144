import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TradeAnnouncementComponent } from './trade-announcement.component';

describe('TradeAnnouncementComponent', () => {
  let component: TradeAnnouncementComponent;
  let fixture: ComponentFixture<TradeAnnouncementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TradeAnnouncementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TradeAnnouncementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
