import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultDescription'
})
export class DefaultDescriptionPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value ||  'Ingen beskrivelse';
  }

}
