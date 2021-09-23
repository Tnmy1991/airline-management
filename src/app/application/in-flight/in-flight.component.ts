import { Component, OnInit, OnDestroy } from '@angular/core';
import { 
  Flight, 
  Passenger, 
  EditEmitter, 
  FlightService,
  PassengerService,
  AncillaryService, 
  SmartTableHeader, 
  AncillaryServicesService
} from '../../data-access';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, of, Subject, Subscription } from 'rxjs';
import { PassengerFormComponent } from '../admin/admin-components/passenger-form/passenger-form.component';

@Component({
  selector: 'app-in-flight',
  templateUrl: './in-flight.component.html',
  styleUrls: ['./in-flight.component.sass']
})
export class InFlightComponent implements OnInit, OnDestroy {

  public flightDetails!: Flight;
  public flightsData: Flight[] = [];
  public currentFlight: string = '';
  public passengersData: Passenger[] = [];
  public passengerTable: SmartTableHeader[] = [
    {
      key: 'full_name',
      label: 'Full Name',
    },
    {
      key: 'seat_number',
      label: 'Seat No.',
    },
    {
      key: 'services',
      label: 'Ancillary Services',
    }
  ];

  private unSubscribe = new Subject<void>();
  private servicesData: AncillaryService[] = [];
  
  constructor(
    private _dialog: MatDialog,
    private _flightService: FlightService,
    private _passengerService: PassengerService,
    private _ancillaryService: AncillaryServicesService
  ) {
    const current_flight = localStorage.getItem('current_flight');
    if( current_flight ) {
      this.flightDetails = JSON.parse(current_flight);
      this.currentFlight = this.flightDetails.flight_number;
    }
  }

  ngOnInit(): void {
    this._flightService.getAllFlights().pipe(
      takeUntil(this.unSubscribe),
      map((flights: Flight[]) => {
        this.flightsData = [...flights];
        if(this.currentFlight === '') {
          const index = Math.floor((Math.random() * this.flightsData.length) + 0);
          this.flightDetails = this.flightsData[index];
          this.currentFlight = this.flightsData[index].flight_number;
        }
        localStorage.setItem('current_flight', JSON.stringify(this.flightDetails));
        return this.flightDetails;
      }),
      mergeMap((flight) => combineLatest([
        of(flight),
        this._passengerService.getAllPassengers(this.currentFlight),
        this._ancillaryService.getAllAncillaryServices(this.currentFlight)
      ])),
      map(([flight, passengers, services]: [Flight, Passenger[], AncillaryService[]]) => {
        let fetchedServices: any = {};
        this.servicesData = services.map((service: AncillaryService) => {
          fetchedServices[service.id] = service.name;
          return {
            ...service,
            flight_id: service.flight_id !== '' ? service.flight_id : flight.flight_number
          };
        });

        this.passengersData = passengers.map((passenger: Passenger) => {
          let purchasedServices: string[] = [];
          if( passenger.ancillary_services.length > 0 ) {
            passenger.ancillary_services.forEach(id => {
              purchasedServices.push(fetchedServices[id])
            });
          }
          return {
            ...passenger,
            services: purchasedServices,
            flight_number: passenger.flight_number !== '' ? passenger.flight_number : flight.flight_number
          };
        });
      })
    ).subscribe(() => {
      this.passengersData.sort((a: Passenger, b: Passenger) => {
        const aRow = a.seat_number.charAt(a.seat_number.length - 1);
        const bRow = b.seat_number.charAt(b.seat_number.length - 1);
        return aRow > bRow ? 1 : -1;
      }).sort((a: Passenger, b: Passenger) => {
        const aRow = parseInt(a.seat_number.slice(0, -1));
        const bRow = parseInt(b.seat_number.slice(0, -1));
        return aRow - bRow;
      });
    });
  }

  handleEditOperation(element: EditEmitter): void {
    switch(element.type) {
      case 'Passengers':
        this._dialog.open(PassengerFormComponent, {
          data: {
            flight_number: this.currentFlight,
            form_data: element.data,
            edit_access: {
              full_name: false,
              passport_number: false,
              address: false,
              date_of_birth: false,
              seat_number: false,
              requiring_wheel_chair: false,
              with_infants: false,
              requiring_special_meal: true,
              ancillary_services: true,
              shopping_request: true,
            },
            services_data: this.servicesData
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            const tmpData = this.passengersData.map(passenger => {
              if(passenger.id === response.id) 
                return {...response}
              else
                return {...passenger}
            });
            this._passengerService.updatePassenger(tmpData);
          }
        });
        break;
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
