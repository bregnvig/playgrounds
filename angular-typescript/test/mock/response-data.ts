module playgrounds.test.mock {

  'use strict';

  angular.module('playgroundsTestData', [])
    .constant('openData', {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': 'Feature',
          'id': 'legeplads.1',
          'geometry': {
            'type': 'Point',
            'coordinates': [
              12.575818079682959,
              55.682711143117565
            ]
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
            'coordinates': [
              12.568528509584322,
              55.682657692613766
            ]
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
            'coordinates': [
              12.582071325958921,
              55.67876337291623
            ]
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
    });
}
