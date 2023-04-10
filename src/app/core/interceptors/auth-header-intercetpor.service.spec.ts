import { TestBed } from '@angular/core/testing';

import { AuthHeaderIntercetporService } from './auth-header-intercetpor.service';

describe('AuthHeaderIntercetporService', () => {
  let service: AuthHeaderIntercetporService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthHeaderIntercetporService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
