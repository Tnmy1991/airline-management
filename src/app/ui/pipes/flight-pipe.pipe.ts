import { Pipe, PipeTransform } from '@angular/core';
import { Flight } from '../../data-access/core.model';

@Pipe({
  name: 'flightPipe'
})
export class FlightPipePipe implements PipeTransform {

  transform(flight: Flight, mode: string): string {
    let time: string = '';
    const currentDate = new Date();
    const randomHour: string = Math.floor((Math.random() * 23) + 1).toString().padStart(2, '0');
    const randomMinute: string = Math.floor((Math.random() * 56) + 0).toString().padStart(2, '0');

    switch(mode) {
      case 'admin':
        time = `${randomHour}:${randomMinute}`
        break;

      case 'check-in':
        time = `${randomHour}:${randomMinute}`
        break;

      case 'in-flight':
        time = `${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}`
        break;
    }

    return `FLIGHT ${flight.flight_number} - ${flight.departing_data.airport_code} to ${flight.arriving_data.airport_code} - Departure at ${time}`;
  }

}
