import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'upper'
})
export class UpperPipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let i, result = '';

    for (i = 0; i < value.length; i++) {
      result += (i + 1) % args[0] ? value[i] : value[i].toUpperCase();
    }

    return result;
  }

}
