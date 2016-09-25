/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaygroundResolveService } from './playground-resolve.service';

describe('Service: PlaygroundResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaygroundResolveService]
    });
  });

  it('should ...', inject([PlaygroundResolveService], (service: PlaygroundResolveService) => {
    expect(service).toBeTruthy();
  }));
});
