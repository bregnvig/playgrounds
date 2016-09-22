/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationService } from './location.service';

describe('Service: Summary', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocationService]
    });
  });

  it('should ...',
    inject([LocationService],
      (service: LocationService) => {
        expect(service).toBeTruthy();
      }));
});
