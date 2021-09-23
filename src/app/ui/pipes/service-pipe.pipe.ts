import { Pipe, PipeTransform } from '@angular/core';
import { serviceTypes } from '../../data-access/mock.data';
import { ServiceType } from '../../data-access/core.model';

@Pipe({
  name: 'servicePipe'
})
export class ServicePipePipe implements PipeTransform {

  transform(type: string): string {
    const service: ServiceType[] = serviceTypes.filter((service: ServiceType) => service.value === type);
    
    return service.length > 0 ? service[0].label : type;
  }

}
