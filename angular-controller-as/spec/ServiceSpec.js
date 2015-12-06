describe('Services', function() {

  beforeEach(module('playgrounds'));
  beforeEach(module('playgroundsTestData'));
  describe('playgroundService', function() {

    var playgroundService;
    var $httpBackend;

    beforeEach(inject(function(_$httpBackend_, _playgroundService_, _openData_) {
        playgroundService = _playgroundService_;
        $httpBackend = _$httpBackend_;
        $httpBackend
          .expectGET('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy')
          .respond(_openData_);
    }));
    it('should return a promise with 3 playgrounds', function() {
      expect(playgroundService).not.toBeNull();
      playgroundService.playgrounds().then(function(playgrounds) {
        expect(3).toEqual(playgrounds.length);
      });
      $httpBackend.flush();
    });
    it('should be possible to do a lookup without data, and wait for the REST call to complete', function() {
      playgroundService.find('legeplads.1').then(function(playground) {
        expect('legeplads.1').toEqual(playground.id);
      });
      expect(playgroundService.playgrounds).not.toBeNull();
      $httpBackend.flush();
    });
  });
});
