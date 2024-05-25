import { Component, OnInit, Input, ChangeDetectionStrategy, Output, EventEmitter, OnDestroy } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import { MatLegacySlideToggleChange as MatSlideToggleChange } from '@angular/material/legacy-slide-toggle';
import { Passenger, PassengerService, AncillaryService, AncillaryServicesService } from '../../data-access';
import { map, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'app-tooltip-layout',
  templateUrl: './tooltip-layout.component.html',
  styleUrls: ['./tooltip-layout.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('tooltip', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(300, style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate(300, style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class TooltipLayoutComponent implements OnInit, OnDestroy {

  @Input() seat_number: string = '';
  @Input() flight_number: string = '';
  @Output() triggerClose: EventEmitter<boolean> = new EventEmitter();

  public passengerDetails!: Passenger;
  private passengersData: Passenger[] = [];
  private unSubscribe = new Subject<void>();

  constructor(
    private _passengerService: PassengerService,
    private _ancillaryService: AncillaryServicesService
  ) { }

  ngOnInit(): void {
    if(this.seat_number) {
      combineLatest([
        this._passengerService.getAllPassengers(this.flight_number),
        this._ancillaryService.getAllAncillaryServices(this.flight_number)
      ]).pipe(
        takeUntil(this.unSubscribe),
        map(([passengers, services]: [Passenger[], AncillaryService[]]) => {
          let fetchedServices: any = {};
          this.passengersData = passengers;
          const passenger = passengers.filter((passenger: Passenger) => {
            return passenger.seat_number === this.seat_number;
          });
  
          services.forEach((service: AncillaryService) => {
            fetchedServices[service.id] = service.name;
          });
  
          return [passenger[0], fetchedServices];
        })
      ).subscribe(([passenger, services]) => {
        let addOns: string[] = [];
        if(passenger.ancillary_services.length > 0) {
          passenger.ancillary_services.forEach((id: string) => {
            addOns.push(services[id]);
          });
        }
  
        this.passengerDetails = {
          ...passenger,
          ancillary_services: addOns,
          flight_number: passenger.flight_number ? passenger.flight_number : this.flight_number
        }
      });
    }
  }

  close(): void {
    this.triggerClose.emit(true);
  }

  toggleCheckIn(event: MatSlideToggleChange): void {
    const tmpData = this.passengersData.map((passenger: Passenger) => {
      if(passenger.seat_number === this.seat_number) {
        return { 
          ...passenger,
          is_checkedIn: event.checked
        };
      } else {
        return { ...passenger };
      }
    });
    this._passengerService.updatePassenger(tmpData);
    this.triggerClose.emit(true);
  }

  ngOnDestroy(): void {
    this.unSubscribe.unsubscribe();
  }

}
