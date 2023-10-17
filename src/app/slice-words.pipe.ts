import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sliceWords'
})
export class SliceWordsPipe implements PipeTransform {
  transform(value: string, maxWords: number): string {
    const words = value.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return value;
  }
}
