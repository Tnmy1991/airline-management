import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'propertyGetter'
})
export class PropertyGetterPipe implements PipeTransform {

  transform(data: any, key: string): string {
    const preData = Array.isArray(data[key])? data[key].join(' | ') : data[key]?.toString();

    return key === 'price' ? `₹${preData}` : (preData ? preData : '-');
  }

}
