import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageOverviewComponent } from './storage-overview.component';

describe('StorageOverviewComponent', () => {
  let component: StorageOverviewComponent;
  let fixture: ComponentFixture<StorageOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
