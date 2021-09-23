import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from './states.models';
import { AuthReducer } from './reducers/auth.reducers';
import { FlightReducer } from './reducers/flight.reduces';
import { PassengerReducer } from './reducers/passenger.reducers';
import { AncillaryServiceReducer } from './reducers/ancillary-service.reducers';
import { hydrationMetaReducer } from "./reducers/hydration.reducer";

export const appReducers: ActionReducerMap<AppState> = {
  AuthState: AuthReducer,
  FlightState: FlightReducer,
  PassengerState: PassengerReducer,
  AncillaryServiceState: AncillaryServiceReducer,
};

export const appMetaReducers: MetaReducer<AppState>[] = [hydrationMetaReducer];