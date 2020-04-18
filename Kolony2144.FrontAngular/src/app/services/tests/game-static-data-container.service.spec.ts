import { TestBed } from '@angular/core/testing';

import { GameStaticDataContainerService } from '../game-static-data-container.service';

describe('GameStaticDataContainerService', () => {
  let service: GameStaticDataContainerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameStaticDataContainerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
