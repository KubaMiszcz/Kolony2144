import { TestBed } from '@angular/core/testing';
import { KolonyService } from './kolony.service';



describe('KolonyService', () => {
  let service: KolonyService; // Add this

  beforeEach(() => {
    // TestBed.configureTestingModule({ providers: [service] });
    TestBed.configureTestingModule({});
    service = TestBed.get(KolonyService); // Add this
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
