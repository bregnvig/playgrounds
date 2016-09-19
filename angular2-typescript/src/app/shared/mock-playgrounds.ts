import { Playground } from './playground';

export const MOCK_PLAYGROUNDS: Playground[] = [
    {
        id: 'legeplads.1',
        name: 'Hauser Plads',
        addressDescription: 'overfor Hauser Plads 16',
        description: 'Godt sted til en legepause på byturen.',
        position: {
            lat: 55.682711143117565,
            lng: 12.575818079682959
        }
    },
    {
        id: 'legeplads.2',
        name: 'Israels Plads',
        addressDescription: 'ved Ahlefeldtsgade',
        description: 'Legeplads med New Yorker-stemning.',
        position: {
            lat: 55.682657692613766,
            lng: 12.568528509584322
        }
    },
    {
        id: 'legeplads.3',
        name: 'Kastellet',
        addressDescription: 'På Smedelinien ved Gustafkirken, udfor Princessens Bastion',
        position: {
            lat: 55.69272449969055,
            lng: 12.591519460476988
        }
    },
    {
        id: 'legeplads.4',
        name: 'Nikolaj Plads',
        addressDescription: 'udfor Nikolaj Plads 5-11',
        description: 'Kunstlegeplads på rolig plads ved Strøget.',
        position: {
            lat: 55.67876337291623,
            lng: 12.582071325958921
        }
    }
];
