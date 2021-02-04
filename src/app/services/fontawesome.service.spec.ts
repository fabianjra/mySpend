import { TestBed } from '@angular/core/testing';

import { FontawesomeService } from './fontawesome.service';

describe('FontawesomeService', () => {
  let service: FontawesomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FontawesomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
