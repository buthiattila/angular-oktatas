import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'split'
})
export class SplitPipe implements PipeTransform {

  transform(value: string[], ...args: any[]): string[] {
    const defaultLimit = 1;
    const limit = args[0] ? (args[0] > 0 ? args[0] : defaultLimit) : defaultLimit;
    const textEnd = args[1] ?? '';
    let array = [];

    for (let i = 0; i < limit; i++) {
      array.push(value[i]);
    }

    if (value.length > limit && textEnd.length) {
      array.push(textEnd);
    }

    return array;
  }

}
