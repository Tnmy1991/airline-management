import {createAction, props } from '@ngrx/store';
import { FlightStateInterface } from '../states.models';

export const loadFlightsData = createAction('[Flight] Flight Data Loading');

export const setFlightsData = createAction(
  '[Flight] Flight Data Set Success',
  props<FlightStateInterface>()
);