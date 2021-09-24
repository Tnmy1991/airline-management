import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let store: MockStore;
  let service: AuthService;
  const initialState = {
    AuthState: {
      id: '',
      name: '',
      email: '',
      photoUrl: '',
      firstName: '',
      lastName: '',
      authToken: '',
      idToken: '',
      provider: '',
      role: 'admin',
    },
    FlightState: {
      flights: [{
        id: 'a9f88eeb-6e2d-4346-afe6-ed7d3a674723',
        airline: 'IndiGo',
        flight_number: '6E-1305',
        departing_data: {
            airport: 'Netaji Subhash Chandra Bose International Airport',
            airport_code: 'CCU',
            terminal: 'B',
            gate_number: 16
        },
        arriving_data: {
            airport: 'Pune International Airport',
            airport_code: 'PNQ',
            terminal: 'B',
            gate_number: 3
        },
      }]
    },
    PassengerState: {
      passengers: [{
        id: 'ee06bebd-aa0e-42f0-844e-dbda3275199d',
        full_name: 'Joy Kerluke',
        passport_number: 'A4991529',
        address: 'Dhule 842092 India',
        date_of_birth: '1918-11-21',
        seat_number: '13F',
        flight_number: '',
        requiring_wheel_chair: false,
        with_infants: false,
        requiring_special_meal: false,
        is_checkedIn: false,
        shopping_request: false,
        ancillary_services: []
      }]
    },
    AncillaryServiceState: {
      ancillary_service: [{
        id: 'd2872f09-b058-424d-901d-9e9bc112e97d',
        name: 'Cardamom Tea',
        type: 'ANC_SER',
        price: '100',
        flight_id: ''
      },
      {
        id: 'f593392d-44f8-4788-8dfd-01fcda432dc2',
        name: 'Low- sugar Masala Tea',
        type: 'ANC_SER',
        price: '100',
        flight_id: ''
      }]
    } 
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideMockStore({ initialState }),]
    });
    service = TestBed.inject(AuthService);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
