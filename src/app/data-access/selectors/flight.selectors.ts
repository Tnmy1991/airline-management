import { createFeatureSelector, createSelector } from '@ngrx/store';
import { flightFeatureKey } from '../reducers/flight.reduces';
import { FlightStateInterface } from '../states.models';

const flightsDetails = createFeatureSelector<FlightStateInterface>(
  flightFeatureKey
);

export const getFlights = createSelector(
  flightsDetails,
  (state: FlightStateInterface) => {
    return state.flights;
  }
);
