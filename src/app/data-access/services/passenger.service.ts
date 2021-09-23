import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../states.models';
import { Passenger } from '../core.model';
import { HttpClient } from '@angular/common/http';
import * as PassengerActions from '../actions/passenger.actions';
import { getPassengers } from '../selectors/passenger.selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PassengerService {

  private rows: string[] = [];

  constructor(private store: Store<AppState>, private _httpClient: HttpClient) {
    for (var i = 1; i <= 30; i++) {
      this.rows.push(...[`${i}A`, `${i}B`, `${i}C`, `${i}D`, `${i}E`, `${i}F`]);
    }
  }

  fetchPassengers(): Observable<Passenger[]> {
    return this._httpClient.get<Passenger[]>('http://localhost:3000/passengers');
  }

  getAllPassengers(flight: string): Observable<Passenger[]> {
    return this.store.select(
      getPassengers
    ).pipe(
      map((passengers: Passenger[]) => {
        const data = passengers.filter(passenger => {
          return passenger.flight_number === flight || passenger.flight_number === '';
        });

        return data;
      })
    );
  }

  updatePassenger(passengers: Passenger[]): void {
    this.store.dispatch(
      PassengerActions.updatePassengerData({passengers: passengers})
    );
  }

  selectSeat(flight: string): Observable<string[]> {
    return this.store.select(getPassengers).pipe(
      map((passengers: Passenger[]) => {
        let bookedSeat: string[] = [], availableSeat: string[] = [];
        passengers.forEach((passenger: Passenger) => {
          if(passenger.flight_number === flight) bookedSeat.push(passenger.seat_number); 
        });
        
        availableSeat = this.rows.filter(row => bookedSeat.indexOf(row) === -1);

        return availableSeat;
      })
    );
  }

}
