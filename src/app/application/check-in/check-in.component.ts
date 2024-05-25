import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { UntypedFormControl } from '@angular/forms';
import { MatLegacyDialog as MatDialog } from '@angular/material/legacy-dialog';
import { combineLatest, of, Subject } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { 
  Flight, 
  Passenger, 
  EditEmitter, 
  FlightService,
  PassengerService,
  AncillaryService, 
  SmartTableHeader, 
  DataInteractionService,  
  AncillaryServicesService
} from '../../data-access';
import { FilterPanelComponent } from '../../ui/filter-panel/filter-panel.component';
import { PassengerFormComponent } from '../admin/admin-components/passenger-form/passenger-form.component';

@Component({
  selector: 'app-check-in',
  templateUrl: './check-in.component.html',
  styleUrls: ['./check-in.component.sass']
})
export class CheckInComponent implements OnInit, OnDestroy {

  public flightDetails!: Flight;
  public flightsData: Flight[] = [];
  public currentFlight: string = '';
  public passengersData: Passenger[] = [];
  public flight: UntypedFormControl =  new UntypedFormControl('');
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

  private editAccess = {
    full_name: false,
    passport_number: false,
    address: false,
    date_of_birth: false,
    seat_number: true,
    requiring_wheel_chair: false,
    with_infants: false,
    requiring_special_meal: false,
    ancillary_services: false,
    shopping_request: false,
  };
  private defaultFilter: string = '';
  private unSubscribe = new Subject<void>();
  private tmpPassengersData: Passenger[] = [];
  private tmpServicesData: AncillaryService[] = [];
  
  constructor(
    private _dialog: MatDialog, 
    private _bottomSheet: MatBottomSheet,
    private _flightService: FlightService,
    private _passengerService: PassengerService,
    private _dataInteraction: DataInteractionService, 
    private _ancillaryService: AncillaryServicesService
  ) {
    const current_flight = localStorage.getItem('current_flight');
    if( current_flight ) {
      this.flightDetails = JSON.parse(current_flight);
      this.currentFlight = this.flightDetails.flight_number;
      this.flight.setValue(this.flightDetails.flight_number);
    }
    this.fetchFlightData();
  }

  ngOnInit(): void {
    this.flight.valueChanges.subscribe(data => {
      this.currentFlight = data;
      this._flightService.getFlight(data).pipe(
        takeUntil(this.unSubscribe)
      ).subscribe(flights => {
        this.flightDetails = flights[0];
      });
      this.fetchFlightData();
    });
    this._dataInteraction.getEmittedFilterData().pipe(
      takeUntil(this.unSubscribe)
    ).subscribe(data => {
      this.filterData(data);
    });
  }

  private fetchFlightData(): void {
    this._flightService.getAllFlights().pipe(
      takeUntil(this.unSubscribe),
      map((flights: Flight[]) => {
        this.flightsData = [...flights];
        if(this.currentFlight === '') {
          const index = Math.floor((Math.random() * this.flightsData.length) + 0);
          this.flight.setValue(this.flightsData[index].flight_number);
          this.currentFlight = this.flightsData[index].flight_number;
          this.flightDetails = this.flightsData[index];
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
        this.passengersData = [];
        let fetchedServices: any = {};
        this.tmpServicesData = services.map((service: AncillaryService) => {
          fetchedServices[service.id] = service.name;
          return {
            ...service,
            flight_id: service.flight_id !== '' ?  service.flight_id : flight.flight_number
          };
        });

        this.tmpPassengersData = passengers.map((passenger: Passenger) => {
          let purchasedServices: string[] = [];
          if( passenger.ancillary_services.length > 0 ) {
            passenger.ancillary_services.forEach(id => {
              purchasedServices.push(fetchedServices[id])
            });
          }

          this.passengersData.push({
            ...passenger,
            services: purchasedServices,
            flight_number: passenger.flight_number !== '' ? passenger.flight_number : flight.flight_number
          });

          return {
            ...passenger,
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
            edit_access: this.editAccess,
            services_data: this.tmpServicesData
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            this.tmpPassengersData = this.passengersData.map(passenger => {
              if(passenger.id === response.id) 
                return {...response}
              else
                return {...passenger}
            });
            this._passengerService.updatePassenger(this.tmpPassengersData);
          }
        });
        break;
    }
  }

  handleFilterOperation(): void {
    this._bottomSheet.open(FilterPanelComponent, {
      data: {
        title: 'Filter Passengers',
        meta: [
          {
            label: 'Mandatory Requirements',
            field: 'mandatory_requirements',
            selected: this.defaultFilter,
            options: [
              {
                value: 'none',
                label: 'Show All'
              },
              {
                value: 'not_checkedIn',
                label: 'Yet to Check-In'
              },
              {
                value: 'checkedIn',
                label: 'Check-In'
              },
              {
                value: 'with_infants',
                label: 'With infants'
              },
              {
                value: 'requiring_wheel_chair',
                label: 'Require Wheel-chair'
              },
              {
                value: 'requiring_special_meal',
                label: 'Require Special Meals'
              }
            ]
          }
        ],
      }
    });
  }

  filterData(formData: any): void {
    for (let key in formData) {
      if (formData.hasOwnProperty(key)) {
        const field = formData[key];
        this.defaultFilter = field;
        if(field === 'none') {
          this.passengersData = [...this.tmpPassengersData];
        } else if(field === 'not_checkedIn') {
          this.passengersData = this.tmpPassengersData.filter((obj: any) => !obj['is_checkedIn']);
        } else if(field === 'checkedIn') {
          this.passengersData = this.tmpPassengersData.filter((obj: any) => obj['is_checkedIn']);
        } else {
          this.passengersData = this.tmpPassengersData.filter((obj: any) => obj[field]);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
