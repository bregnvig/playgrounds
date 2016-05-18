import {Pipe, PipeTransform} from "angular2/core";
import {LocationService} from "../services/location";
import {ICoordinate} from "../model/playground";

@Pipe({
  name: 'defaultPlaceholder'
})
export class DefaultPlaceholderPipe implements  PipeTransform {

  transform(value: any): any {
    return value || 'Ingen beskrivelse';
  }

}

@Pipe({
  name: 'distance',
  pure: false
})
export class DistancePipe implements PipeTransform {

  private _currentPosition:ICoordinate;

  constructor(location:LocationService) {
    location.current.subscribe(position => this._currentPosition = position);
  }

  transform(position:ICoordinate): any {
    if (this._currentPosition && position) {
      return geolib.getDistance(this._currentPosition, position);
    }
    return 'Ukendt';
  }
}

@Pipe({
  name: 'humanizeDistance',
  pure: false
})
export class HumanizeDistancePipe implements PipeTransform {
  transform(value: any): any {
    if (typeof value === 'number') {
      if (value <= 750) {
        return `${value} m`;
      } else if (value <= 1500) {
        return 'Et stykke vej';
      }
      return 'Ikke til fods!';
    }
    return value;
  }
}