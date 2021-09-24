import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { 
  FlightService,
  PassengerService,  
  AncillaryServicesService
} from '../../data-access';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { TooltipLayoutComponent } from './tooltip-layout.component';

describe('TooltipLayoutComponent', () => {
  let store: MockStore;
  let component: TooltipLayoutComponent;
  let fixture: ComponentFixture<TooltipLayoutComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiModule, BrowserAnimationsModule, HttpClientTestingModule],
      declarations: [ TooltipLayoutComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FlightService,
        PassengerService, 
        AncillaryServicesService,
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipLayoutComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
