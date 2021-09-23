import { createReducer, on, Action } from '@ngrx/store';
import { FlightStateInterface, initialFlightState } from '../states.models';
import * as FlightActions from '../actions/flight.actions';

export const flightFeatureKey = 'FlightState';

export const reducer = createReducer(
  initialFlightState,
  on(FlightActions.setFlightsData, (state, flight) => ({
    ...state,
    ...flight
  }))
);

export function FlightReducer(state: FlightStateInterface | undefined, action: Action): FlightStateInterface {
  return reducer(state as FlightStateInterface, action as Action);
}