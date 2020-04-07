import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerOverviewComponent } from './power-overview.component';

describe('PowerOverviewComponent', () => {
  let component: PowerOverviewComponent;
  let fixture: ComponentFixture<PowerOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PowerOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
