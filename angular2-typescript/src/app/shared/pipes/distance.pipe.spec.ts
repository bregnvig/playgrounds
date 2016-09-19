/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LocationService, Coordinate } from '../index';
import { DistancePipe } from './distance.pipe';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';

const subject = new Subject();
const locationServiceFactory = () => {
    return {
        current: subject,
        getDistance: jasmine.createSpy('getDistanceSpy')
    };
};

describe('Pipe: DistancePipe', () => {

    let pipe: DistancePipe;
    let locationService: LocationService;

    const position = {
        lat: 55.72098055865299,
        lng: 12.528431156384602
    };
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                DistancePipe,
                {
                    provide: LocationService,
                    useFactory: locationServiceFactory
                }
            ]
        });
    });

    beforeEach(inject([DistancePipe, LocationService], (_pipe: DistancePipe, _locationService: LocationService) => {
        pipe = _pipe;
        locationService = _locationService;
    }));

    it(`should return a location service!`, () => {
        expect(locationService).not.toBeNull();
    });

    it(`should return Ukendt, when the position is not defined`, () => {
        expect(pipe.transform(position)).toEqual('Ukendt');
        expect(locationService.getDistance).not.toHaveBeenCalled();
    });

    it(`should call getDistance, when the position is defined`, () => {
        subject.next({
            lat: 55.72098055865299,
            lng: 12.528
        });
        pipe.transform(position);
        expect(locationService.getDistance).toHaveBeenCalled();
    });

});
