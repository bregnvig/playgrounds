/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PlaygroundResolveService } from './playground-resolve.service';
import {RouterTestingModule} from '@angular/router/testing';
import { PlaygroundService } from './';
import { HttpModule } from '@angular/http';

describe('Service: PlaygroundResolve', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpModule],
      providers: [PlaygroundService, PlaygroundResolveService]
    });
  });

  it('should ...', inject([PlaygroundResolveService], (service: PlaygroundResolveService) => {
    expect(service).toBeTruthy();
  }));
});
