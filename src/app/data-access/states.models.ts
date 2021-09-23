import { 
  Flight, 
  Passenger, 
  AncillaryService 
} from './core.model';

export interface AppState {
  AuthState: AuthStateInterface;
  FlightState: FlightStateInterface;
  PassengerState: PassengerStateInterface;
  AncillaryServiceState: AncillaryServiceStateInterface;
}

export interface AuthStateInterface {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  authToken: string;
  idToken?: string;
  provider: string;
  role: string;
}

export interface FlightStateInterface {
  flights: Flight[];
}

export interface PassengerStateInterface {
  passengers: Passenger[];
}

export interface AncillaryServiceStateInterface {
  ancillary_service: AncillaryService[];
}

export const initialAuthState: AuthStateInterface = {
  id: '',
  name: '',
  email: '',
  photoUrl: '',
  firstName: '',
  lastName: '',
  authToken: '',
  idToken: '',
  provider: '',
  role: ''
}

export const initialFlightState: FlightStateInterface = {
  flights: [],
}

export const initialPassengerState: PassengerStateInterface = {
  passengers: [],
}

export const initialAncillaryServiceState: AncillaryServiceStateInterface = {
  ancillary_service: [],
}
