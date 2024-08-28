import { TestBed } from '@angular/core/testing';

import { ShareemployeeService } from './shareemployee.service';

describe('ShareemployeeService', () => {
  let service: ShareemployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareemployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
