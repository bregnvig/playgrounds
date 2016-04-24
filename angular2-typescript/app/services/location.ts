import {Injectable} from "angular2/core";
import {ICoordinate} from "../model/playground";
import {BehaviorSubject} from "rxjs/Rx";
import {Subject} from "rxjs/Subject";

@Injectable()
export class LocationService {

  private _locationSubject: Subject<ICoordinate>;

  constructor() {
    this._locationSubject = new BehaviorSubject(null);
    this.refresh();
  }

  private refresh() {
    window.navigator.geolocation.getCurrentPosition(position => {
      this._locationSubject.next({
        lat: position.coords.latitude,
        lng: position.coords.longitude
      });
    })
  }

  public get current() {
    return this._locationSubject;
  }
}