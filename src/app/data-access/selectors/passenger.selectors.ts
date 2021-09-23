import { createFeatureSelector, createSelector } from '@ngrx/store';
import { passengerFeatureKey } from '../reducers/passenger.reducers';
import { PassengerStateInterface } from '../states.models';

const passengersDetails = createFeatureSelector<PassengerStateInterface>(
  passengerFeatureKey
);

export const getPassengers = createSelector(
  passengersDetails,
  (state: PassengerStateInterface) => {
    return state.passengers;
  }
);
