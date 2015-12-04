describe('Filters', function() {

  beforeEach(module('playgrounds'));

  describe('Humanize', function() {
    var humanizer;
    beforeEach(inject(function(_$filter_) {
        humanizer = _$filter_('humanizeDistance');
    }));

    it('Should be to far to walk when the distance is 2km or more', function() {
      expect('Ikke til fods!').toEqual(humanizer(200));
      expect('Ikke til fods!').toEqual(humanizer(20000));
    });
    it('Should be to ok to walk when the distance is less than 2km', function() {
      expect('Et stykke vej').toEqual(humanizer(1999));
    });
    it('Should return the distance in meters, when it is less than 750 meters', function() {
      expect('749 m').toEqual(humanizer(749));
      expect('51 m').toEqual(humanizer(51));
    });
    it('Should return unknown, if the distance is unknown', function() {
      expect('Ukendt').toEqual(humanizer(undefined));
    });
  });

  describe('Default description', function() {
    var defaultDescription;
    beforeEach(inject(function(_$filter_) {
        defaultDescription = _$filter_('defaultDescription');
    }));
    it('should return the given value, when the value is not undefined', function() {
      expect('Hello world').toEqual(defaultDescription('Hello world'));
    });
    it('should return a default description, when the value is undefined', function() {
      expect('Ingen beskrivelse').toEqual(defaultDescription(undefined));
      expect('Ingen beskrivelse').toEqual(defaultDescription(null));
      expect('Ingen beskrivelse').toEqual(defaultDescription(0));
    });
  });
});
