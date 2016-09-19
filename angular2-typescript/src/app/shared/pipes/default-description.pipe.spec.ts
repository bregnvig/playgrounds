/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DefaultDescriptionPipe } from './default-description.pipe';

describe('Pipe: DefaultDescriptionPipe', () => {

  let pipe: DefaultDescriptionPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DefaultDescriptionPipe]
    });
  });

  beforeEach(inject([DefaultDescriptionPipe], (_pipe: DefaultDescriptionPipe) => {
    pipe = _pipe;
  }));

  it(`Should return 'Ingen beskrivelse' when input i falshy`, () => {
    expect(pipe.transform(null)).toEqual('Ingen beskrivelse');
    expect(pipe.transform('')).toEqual('Ingen beskrivelse');
    expect(pipe.transform(undefined)).toEqual('Ingen beskrivelse');
  });

  it(`Should return value when input i truthy`, () => {
    expect(pipe.transform('Hello')).toEqual('Hello');
  });
});
