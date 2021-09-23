import { createReducer, on, Action } from '@ngrx/store';
import { PassengerStateInterface, initialPassengerState } from '../states.models';
import * as PassengerActions from '../actions/passenger.actions';

export const passengerFeatureKey = 'PassengerState';

export const reducer = createReducer(
  initialPassengerState,
  on(PassengerActions.setPassengersData, (state, passenger) => ({
    ...state,
    ...passenger
  })),
  on(PassengerActions.updatePassengerData, (state, passenger) => ({
    ...state,
    ...passenger
  }))
);

export function PassengerReducer(state: PassengerStateInterface | undefined, action: Action): PassengerStateInterface {
  return reducer(state as PassengerStateInterface, action as Action);
}