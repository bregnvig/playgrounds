/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RatingResolveService } from './rating-resolve.service';

describe('Service: RatingResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingResolveService]
    });
  });

  it('should ...', inject([RatingResolveService], (service: RatingResolveService) => {
    expect(service).toBeTruthy();
  }));
});
