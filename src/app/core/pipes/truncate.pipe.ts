import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    const defaultLimit = 10;
    const limit = args[0] ? (args[0] > 0 ? args[0] : defaultLimit) : defaultLimit;
    const textEnd = args[1] ?? '...';

    return value.substring(0, limit).trim() + textEnd;
  }

}
