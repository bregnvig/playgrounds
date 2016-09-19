/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HumanizeDistancePipe } from './humanize-distance.pipe';

describe('Pipe: HumanizeDistancePipe', () => {

  let pipe: HumanizeDistancePipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HumanizeDistancePipe]
    });
  });

  beforeEach(inject([HumanizeDistancePipe], (_pipe: HumanizeDistancePipe) => {
    pipe = _pipe;
  }));

  it(`Should return amount if less or equal to 750`, () => {
    expect(pipe.transform(750)).toEqual('750 m');
    expect(pipe.transform(0)).toEqual('0 m');
    expect(pipe.transform(250)).toEqual('250 m');

    expect(pipe.transform(751)).not.toEqual('751 m');

  });

  it(`Should return 'Et stykke vej' if more than 750 and less or equal to 1500`, () => {
    expect(pipe.transform(750)).not.toEqual('Et stykke vej');
    expect(pipe.transform(751)).toEqual('Et stykke vej');
    expect(pipe.transform(1500)).toEqual('Et stykke vej');

    expect(pipe.transform(1501)).not.toEqual('Et stykke vej');
  });

  it(`Should return the string it receives and return it, without modifying it`, () => {
    expect(pipe.transform('Ukendt')).toEqual('Ukendt');
    expect(pipe.transform('Some other message')).toEqual('Some other message');
  });



});
