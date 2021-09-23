import { Component, OnChanges, Input } from '@angular/core';
import { Flight } from '../../data-access';

@Component({
  selector: 'app-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.sass']
})
export class FlightDetailsComponent implements OnChanges {

  @Input() data!: Flight;

  public flightDetails!: Flight;

  ngOnChanges(): void {
    this.flightDetails = this.data;
  }

}
