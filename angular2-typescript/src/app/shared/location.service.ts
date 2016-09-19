import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/share';

import { Coordinate } from './coordinate';

@Injectable()
export class LocationService {

  private locationStream: Observable<Coordinate>;

  constructor() {
    this.locationStream = Observable
      .create(observer => {
        const watchId = window.navigator.geolocation.watchPosition(position => {
          observer.next(position);
        }, error => observer.error(error));
        return () => window.navigator.geolocation.clearWatch(watchId);
      })
      .map((position: Position) => {
        return {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      })
      .publishReplay(1)
      .refCount();
  }

  public get current(): Observable<Coordinate> {
    return this.locationStream;
  }

  public getDistance(p1: Coordinate, p2: Coordinate) {

    const c = Math.cos;
    const p = 0.017453292519943295;    // Math.PI / 180

    const a = 0.5 - c((p2.lat - p1.lat) * p) / 2 + c(p1.lat * p) * c(p2.lat * p) * (1 - c((p2.lng - p1.lng) * p)) / 2;

    return Math.floor(12742000 * Math.asin(Math.sqrt(a))); // 2 * R; R = 6371 km
  }


}
