import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseOverviewComponent } from './warehouse-overview.component';

describe('WarehouseOverviewComponent', () => {
  let component: WarehouseOverviewComponent;
  let fixture: ComponentFixture<WarehouseOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarehouseOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarehouseOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
