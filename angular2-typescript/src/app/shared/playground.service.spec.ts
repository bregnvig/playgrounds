/* tslint:disable:no-unused-variable */

const openData = {
  'type': 'FeatureCollection',
  'features': [
    {
      'type': 'Feature',
      'id': 'legeplads.1',
      'geometry': {
        'type': 'Point',
        'coordinates': [[
          12.575818079682959,
          55.682711143117565
        ]]
      },
      'geometry_name': 'wkb_geometry',
      'properties': {
        'id': 2,
        'legeplads_id': 7,
        'navn': 'Legepladsen på Hauser Plads',
        'adressebeskrivelse': 'overfor Hauser Plads 16',
        'bydel': 'Indre By',
        'legeplads_type': 'Legeplads',
        'aldersgruppe': null,
        'ejer': 'Københavns kommune',
        'beskrivelse': 'Godt sted til en legepause på byturen.',
        'link': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=57',
        'link_kkdk': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=57',
        'graffitirenhold': 'ja',
        'graffitirenhold_id': 8
      }
    },
    {
      'type': 'Feature',
      'id': 'legeplads.2',
      'geometry': {
        'type': 'Point',
        'coordinates': [[
          12.568528509584322,
          55.682657692613766
        ]]
      },
      'geometry_name': 'wkb_geometry',
      'properties': {
        'id': 3,
        'legeplads_id': 8,
        'navn': 'Legepladsen på Israels Plads',
        'adressebeskrivelse': 'ved Ahlefeldtsgade',
        'bydel': 'Indre By',
        'legeplads_type': 'Legeplads',
        'aldersgruppe': '0-16',
        'ejer': 'Københavns kommune',
        'beskrivelse': 'Legeplads med New Yorker-stemning.',
        'link': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=58',
        'link_kkdk': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=58',
        'graffitirenhold': 'ja',
        'graffitirenhold_id': 9
      }
    },
    {
      'type': 'Feature',
      'id': 'legeplads.3',
      'geometry': {
        'type': 'Point',
        'coordinates': [[
          12.582071325958921,
          55.67876337291623
        ]]
      },
      'geometry_name': 'wkb_geometry',
      'properties': {
        'id': 6,
        'legeplads_id': 13,
        'navn': 'Legepladsen på Nikolaj Plads',
        'adressebeskrivelse': 'udfor Nikolaj Plads 5-11',
        'bydel': 'Indre By',
        'legeplads_type': 'Legeplads',
        'aldersgruppe': '0-6',
        'ejer': 'Københavns kommune',
        'beskrivelse': 'Kunstlegeplads på rolig plads ved Strøget.',
        'link': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=61',
        'link_kkdk': 'http://kk.sites.itera.dk/apps/kk_legepladser_ny/index.asp?mode=detalje&id=61',
        'graffitirenhold': 'ja',
        'graffitirenhold_id': 13
      }
    }
  ]
};


import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { PlaygroundService, Playground } from './index';

describe('Service: Playground', () => {

  let connection, service, http, backend;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http, useFactory: (_backend, options) => {
            return new Http(_backend, options);
          }, deps: [MockBackend, BaseRequestOptions]
        },
        PlaygroundService
      ]
    });
  });

  beforeEach(inject([MockBackend, Http], (_backend: MockBackend, _http: Http) => {
    backend = _backend;
    http = _http;
    backend.connections.subscribe(c => {
      connection = c;
    });
  }));

  beforeEach(inject([PlaygroundService], (_service: PlaygroundService) => {
    service = _service;
  }));


  it('should fetch some data', done => {
    // http.get('http://data.kk.dk/dataset/legepladser/resource/79d60521-5748-4287-a875-6d0e23fac31e/proxy').subscribe()
    service.getPlaygrounds().subscribe((playgrounds: Playground[]) => {
      expect(playgrounds.length).toBe(3);
      expect(playgrounds[0].position.lat).toBe(55.682711143117565);
      expect(playgrounds[0].position.lng).toBe(12.575818079682959);
      done();
    });
    connection.mockRespond(new Response({ body: openData, status: 200, merge: null, headers: null, url: null }));
  });
});

