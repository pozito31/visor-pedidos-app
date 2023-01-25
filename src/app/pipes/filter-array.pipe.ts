import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterArray'
})
export class FilterArrayPipe implements PipeTransform {

  transform(array: any[], key: string, value: any): any {
    return array.filter(a => a[key] == value);
  }

}
