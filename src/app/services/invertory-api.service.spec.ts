import { TestBed } from '@angular/core/testing';

import { InvertoryApiService } from './invertory-api.service';

describe('InvertoryApiService', () => {
  let service: InvertoryApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvertoryApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
