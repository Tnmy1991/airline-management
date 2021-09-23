import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import { FlightService } from './services/flight.service';
import { PassengerService } from './services/passenger.service';
import { AncillaryServicesService } from './services/ancillary-services.service';
import * as FlightActions from './actions/flight.actions';
import * as PassengerActions from './actions/passenger.actions';
import * as AncillaryServicesActions from './actions/ancillary-service.actions';

@Injectable()
export class AppEffects {

  loadFlights$ = createEffect(() => this.actions$.pipe(
    ofType(FlightActions.loadFlightsData),
    tap(() => console.log('call')),
    mergeMap(() => this._flights.fetchFlights()
      .pipe(
        map(results => (FlightActions.setFlightsData({flights: results}))),
        catchError(() => EMPTY)
      ))
    )
  );

  loadPassengers$ = createEffect(() => this.actions$.pipe(
    ofType(PassengerActions.loadPassengersData),
    mergeMap(() => this._passengers.fetchPassengers()
      .pipe(
        map(results => (PassengerActions.setPassengersData({passengers: results}))),
        catchError(() => EMPTY)
      ))
    )
  );

  loadAncillaryServices$ = createEffect(() => this.actions$.pipe(
    ofType(AncillaryServicesActions.loadAncillaryServicesData),
    mergeMap(() => this._ancillaryServices.fetchAncillaryServices()
      .pipe(
        map(results => (AncillaryServicesActions.setAncillaryServicesData({ancillary_service: results}))),
        catchError(() => EMPTY)
      ))
    )
  );

  constructor(
    private actions$: Actions,
    private _flights: FlightService,
    private _passengers: PassengerService,
    private _ancillaryServices: AncillaryServicesService,
  ) {}
}