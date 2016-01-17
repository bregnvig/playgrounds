module playgrounds.test.spec.common {

  import IHumanizeDistanceFilter = playgrounds.common.filters.IHumanizeDistanceFilter;
  import IDefaultDescriptionFilter = playgrounds.common.filters.IDefaultDescriptionFilter;

  'use strict';

  describe('Filters', () => {

    beforeEach(angular.mock.module('playgrounds'));

    describe('Humanize', () => {
      let humanizer: IHumanizeDistanceFilter;
      beforeEach(inject((_humanizeDistanceFilter_: IHumanizeDistanceFilter) => {
        humanizer = _humanizeDistanceFilter_;
      }));

      it('Should be to far to walk when the distance is 2km or more', () => {
        expect('Ikke til fods!').toEqual(humanizer(2000));
        expect('Ikke til fods!').toEqual(humanizer(20000));
      });
      it('Should be to ok to walk when the distance is less than 2km', () => {
        expect('Et stykke vej').toEqual(humanizer(1999));
      });
      it('Should return the distance in meters, when it is less than 750 meters', () => {
        expect('749 m').toEqual(humanizer(749));
        expect('51 m').toEqual(humanizer(51));
      });
      it('Should return unknown, if the distance is unknown', () => {
        expect('Ukendt').toEqual(humanizer(undefined));
      });
    });

    describe('Default description', () => {
      let defaultDescription: IDefaultDescriptionFilter;
      beforeEach(inject((_defaultDescriptionFilter_: IDefaultDescriptionFilter) => {
        defaultDescription = _defaultDescriptionFilter_;
      }));
      it('should return the given value, when the value is not undefined', () => {
        expect('Hello world').toEqual(defaultDescription('Hello world'));
      });
      it('should return a default description, when the value is undefined', () => {
        expect('Ingen beskrivelse').toEqual(defaultDescription(undefined));
        expect('Ingen beskrivelse').toEqual(defaultDescription(null));
        expect('Ingen beskrivelse').toEqual(defaultDescription(0));
      });
    });
  });
}
