module playgrounds.test.spec.common {

  import IOpenData = OpenData.IOpenData;
  import IPlaygroundService = playgrounds.common.service.IPlaygroundService;

  'use strict';

  describe('Services', () => {


    beforeEach(angular.mock.module('playgrounds'));
    beforeEach(angular.mock.module('playgroundsTestData'));
    describe('playgroundService', () => {

      let playgroundService: IPlaygroundService;
      let $httpBackend: angular.IHttpBackendService;

      beforeEach(inject((_$httpBackend_: angular.IHttpBackendService, _playgroundService_: IPlaygroundService, _openData_: IOpenData) => {
        playgroundService = _playgroundService_;
        $httpBackend = _$httpBackend_;
        $httpBackend
          .expectGET('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy')
          .respond(JSON.stringify(_openData_));
      }));
      it('should return a promise with 3 playgrounds', () => {
        expect(playgroundService).not.toBeNull();
        playgroundService.playgrounds().then((playgrounds) => expect(3).toEqual(playgrounds.length));
        $httpBackend.flush();
      });
      it('should be possible to do a lookup without data, and wait for the REST call to complete', () => {
        playgroundService.find('legeplads.1').then((playground) => expect('legeplads.1').toEqual(playground.id));
        expect(playgroundService.playgrounds).not.toBeNull();
        $httpBackend.flush();
      });
    });
  });
}
