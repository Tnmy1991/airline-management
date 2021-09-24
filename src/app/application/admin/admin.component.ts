import { Component, OnInit, OnDestroy } from '@angular/core';
import { map, mergeMap, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { combineLatest, of, Subject } from 'rxjs';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { 
  Flight, 
  Passenger, 
  EditEmitter, 
  FlightService,
  AppInitService,
  PassengerService,
  AncillaryService, 
  SmartTableHeader, 
  DataInteractionService,  
  AncillaryServicesService
} from '../../data-access';
import { FilterPanelComponent } from '../../ui/filter-panel/filter-panel.component';
import { PassengerFormComponent } from './admin-components/passenger-form/passenger-form.component';
import { AncillaryServiceFormComponent } from './admin-components/ancillary-service-form/ancillary-service-form.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit, OnDestroy {

  public flightsData: Flight[] = [];
  public passengersData: Passenger[] = [];
  public servicesData: AncillaryService[] = [];
  public flight: FormControl =  new FormControl('');
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
  public servicesTable: SmartTableHeader[] = [
    {
      key: 'name',
      label: 'Item Name',
    },
    {
      key: 'type',
      label: 'Service Type',
    },
    {
      key: 'price',
      label: 'Price',
    }
  ];

  private editAccess = {
    full_name: true,
    passport_number: true,
    address: true,
    date_of_birth: true,
    seat_number: false,
    requiring_wheel_chair: true,
    with_infants: true,
    requiring_special_meal: true,
    ancillary_services: true,
    shopping_request: true,
  };
  private flightDetails!: Flight;
  private defaultFilter: string = '';
  private currentFlight: string = '';
  private unSubscribe = new Subject<void>();
  private tmpPassengersData: Passenger[] = [];
  private tmpAncillaryServicesData: AncillaryService[] = [];

  constructor(
    private _dialog: MatDialog, 
    private _appInit: AppInitService,
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
      this._appInit.Init();
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
        const index = Math.floor((Math.random() * this.flightsData.length) + 0);
        if(this.currentFlight === '') {
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
        this.tmpAncillaryServicesData = services.map((service: AncillaryService) => {
          fetchedServices[service.id] = service.name;
          return {
            ...service,
            flight_id: service.flight_id !== '' ? service.flight_id : flight.flight_number
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

        return this.tmpAncillaryServicesData;
      })
    ).subscribe((response: AncillaryService[]) => {
      this.servicesData = response;
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
            services_data: this.servicesData
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            this.tmpPassengersData = this.tmpPassengersData.map(passenger => {
              if(passenger.id === response.id) 
                return {...response}
              else
                return {...passenger}
            });
            this._passengerService.updatePassenger(this.tmpPassengersData);   
          }
        });
        break;

      case 'Ancillary Services':
        this._dialog.open(AncillaryServiceFormComponent, {
          data: {
            flight_number: this.currentFlight,
            services_data: element.data
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            this.tmpAncillaryServicesData = this.servicesData.map(service => {
              if(service.id === response.id) 
                return {...response}
              else
                return {...service}
            });
            this._ancillaryService.updateAllAncillaryService(this.tmpAncillaryServicesData);
          }
        });
        break;
    }
  }

  handleAddOperation(event: string): void {
    switch(event) {
      case 'Passengers':
        this._dialog.open(PassengerFormComponent, {
          data: {
            flight_number: this.currentFlight,
            services_data: this.servicesData,
            edit_access: this.editAccess,
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            this.tmpPassengersData.push(response);
            this._passengerService.updatePassenger(this.tmpPassengersData);
          }
        });
        break;

      case 'Ancillary Services':
        this._dialog.open(AncillaryServiceFormComponent, {
          data: {
            flight_number: this.currentFlight
          }
        }).afterClosed().subscribe(response => {
          if(response) {
            this.tmpAncillaryServicesData.push(response);
            this._ancillaryService.updateAllAncillaryService(this.tmpAncillaryServicesData);
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
                value: 'address',
                label: 'Address'
              },
              {
                value: 'passport_number',
                label: 'Passport Number'
              },
              {
                value: 'date_of_birth',
                label: 'Date of Birth'
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
        if(key === 'none') {
          this.passengersData = [...this.tmpPassengersData];
        } else {
          this.passengersData = this.tmpPassengersData.filter((obj: any) => !obj[field]);
        }
      }
    }
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }
}