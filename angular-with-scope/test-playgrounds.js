angular.module('playgrounds')
  .constant('testPlaygrounds', [
    {
      id: 'legeplads.1',
      'navn': 'Hauser Plads',
      'adresseBeskrivelse': 'overfor Hauser Plads 16',
      'beskrivelse': 'Godt sted til en legepause på byturen.',
      'position': {
        'latitude': 55.682711143117565,
        'longitude': 12.575818079682959
      }
    },
    {
      id: 'legeplads.2',
      'navn': 'Israels Plads',
      'adresseBeskrivelse': 'ved Ahlefeldtsgade',
      'beskrivelse': 'Legeplads med New Yorker-stemning.',
      'position': {
        'latitude': 55.682657692613766,
        'longitude': 12.568528509584322
      }
    },
    {
      id: 'legeplads.3',
      'navn': 'Kastellet',
      'adresseBeskrivelse': 'På Smedelinien ved Gustafkirken, udfor Princessens Bastion',
      'position': {
        'latitude': 55.69272449969055,
        'longitude': 12.591519460476988
      }
    },
    {
      id: 'legeplads.4',
      'navn': 'Nikolaj Plads',
      'adresseBeskrivelse': 'udfor Nikolaj Plads 5-11',
      'beskrivelse': 'Kunstlegeplads på rolig plads ved Strøget.',
      'position': {
        'latitude': 55.67876337291623,
        'longitude': 12.582071325958921
      }
    }
  ]);
