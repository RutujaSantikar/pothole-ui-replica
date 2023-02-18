import { TestBed } from '@angular/core/testing';

import { DistrictDataService } from './district-data.service';

describe('DistrictDataService', () => {
  let service: DistrictDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistrictDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
