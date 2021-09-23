import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states.models';
import { Flight } from '../core.model';
import { HttpClient } from '@angular/common/http';
import * as FlightActions from '../actions/flight.actions';
import { getFlights } from '../selectors/flight.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private store: Store<AppState>, private _httpClient: HttpClient) {}

  fetchFlights(): Observable<Flight[]> {
    return this._httpClient.get<Flight[]>('http://localhost:3000/flights');
  }

  getAllFlights(): Observable<Flight[]> {
    return this.store.select(
      getFlights
    );
  }

  getFlight(flight_no: string): Observable<Flight[]> {
    return this.store.select(
      getFlights
    ).pipe(
      map((flights: Flight[]) => {
        const flight = flights.filter(flight => {
          return flight.flight_number === flight_no;
        });
        return flight;
      })
    );
  }
}
