import { TestBed } from '@angular/core/testing';

import { GameDataProviderService } from '../game-data-provider.service';

describe('GameStaticDataContainerService', () => {
  let service: GameDataProviderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameDataProviderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
