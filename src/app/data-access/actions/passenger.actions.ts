import { createAction, props } from '@ngrx/store';
import { PassengerStateInterface } from '../states.models';

export const loadPassengersData = createAction('[Passenger] Passenger Data Loading');

export const setPassengersData = createAction(
  '[Passenger] Passenger Data Set Success',
  props<PassengerStateInterface>()
);

export const updatePassengerData = createAction(
  '[Passenger] Passenger Update Success',
  props<PassengerStateInterface>()
);