import { Pipe, PipeTransform } from '@angular/core';

import { LocationService } from '../location.service';
import { Coordinate } from '../coordinate';
import { Observable } from 'rxjs/Observable';

@Pipe({
  name: 'distance',
  pure: false
})
export class DistancePipe implements PipeTransform {

  private currentLocation: Coordinate;

  constructor(private locationService: LocationService) {
    this.locationService.current
      .catch(() => Observable.empty())
      .subscribe((location: Coordinate) => this.currentLocation = location);
  }

  transform(value: Coordinate, args?: any): any {
    if (this.currentLocation) {
      return this.locationService.getDistance(this.currentLocation, value);
    }
    return 'Ukendt';
  }

}
