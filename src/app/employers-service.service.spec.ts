import { TestBed } from '@angular/core/testing';

import { EmployersServiceService } from './employers-service.service';

describe('EmployersServiceService', () => {
  let service: EmployersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
