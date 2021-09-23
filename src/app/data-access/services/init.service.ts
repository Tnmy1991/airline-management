import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states.models';
import * as FlightActions from '../actions/flight.actions';
import * as PassengerActions from '../actions/passenger.actions';
import * as AncillaryServicesActions from '../actions/ancillary-service.actions';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(
    private store: Store<AppState>
  ) {}

  Init() {
    return new Promise<void>((resolve, reject) => {
      try {
        this.store.dispatch(FlightActions.loadFlightsData());
        this.store.dispatch(PassengerActions.loadPassengersData());
        this.store.dispatch(AncillaryServicesActions.loadAncillaryServicesData());
        resolve();
      } catch(Exception) {
        console.error('Something wrong happened!')
        reject();
      }
    });
  }
}
