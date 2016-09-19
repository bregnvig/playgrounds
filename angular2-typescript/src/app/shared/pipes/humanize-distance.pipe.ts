import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'humanizeDistance'
})
export class HumanizeDistancePipe implements PipeTransform {

  transform(value: string | number, args?: any): any {
    if (typeof value !== 'number') {
      return value;
    }
    const distance: number = <number>value;
    if (distance <= 750) {
      return `${distance} m`;
    } else if (distance <= 1500) {
      return 'Et stykke vej';
    }
    return 'Ikke til fods!';
  }
}
