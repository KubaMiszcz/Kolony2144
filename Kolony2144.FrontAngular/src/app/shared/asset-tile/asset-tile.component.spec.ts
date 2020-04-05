import { prefixUOMPipe } from './../pipes/km-numeric.pipe';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetTileComponent } from './asset-tile.component';
import { FormsModule } from '@angular/forms';
import { StarterBuildings } from 'src/app/models/Building';
import { DebugElement } from '@angular/core';


describe('AssetTileComponent', () => {
  let component: AssetTileComponent;
  let fixture: ComponentFixture<AssetTileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AssetTileComponent, prefixUOMPipe],
      imports: [FormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetTileComponent);
    component = fixture.componentInstance;
    component.asset = StarterBuildings[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
