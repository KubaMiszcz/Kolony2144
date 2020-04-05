import { Pipe, PipeTransform } from '@angular/core';
import { UoMs } from 'src/app/models/enums/UOMs.enum';

@Pipe({
  name: 'camelCaseToHumanCasePipe'
})
export class CamelCaseToHumanCasePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (!value[0]) return value;
    value = value as string;
    value = value[0].toUpperCase() + value.slice(1);
    return value.split(/(?=[A-Z])/).join(' ');
  }
}
