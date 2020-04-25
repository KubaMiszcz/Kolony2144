import { TestBed } from '@angular/core/testing';
import { CommonService } from '../common.service';


describe('CommonService', () => {
  let service: CommonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  it('sumColumnOftableByHeader = 18', () => {
    // service = new CommonService();
    const table = [
      ['a', 'b', 'c'],
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9]
    ];

    expect(service.sumColumnOftableByHeader(table, 'c')).toEqual(3 + 6 + 9, 'wrong');
  });







});
