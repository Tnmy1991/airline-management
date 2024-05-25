import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MAT_LEGACY_DIALOG_DATA as MAT_DIALOG_DATA,
  MatLegacyDialogRef as MatDialogRef,
} from '@angular/material/legacy-dialog';
import { UiModule } from '../../../../ui/ui.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PassengerFormComponent } from './passenger-form.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PassengerService } from '../../../../data-access';

describe('PassengerFormComponent', () => {
  let store: MockStore;
  let component: PassengerFormComponent;
  let fixture: ComponentFixture<PassengerFormComponent>;
  const dialogMock = {
    close: () => {},
  };
  const mockData = {
    flight_number: 'test-123',
    form_data: {
      id: 'dd1110c4-a976-4528-b76e-1e62844a3471',
      full_name: 'Gwendolyn Ruecker',
      passport_number: 'T4539563',
      address: 'Kollam 228469 India',
      date_of_birth: '1943-02-03',
      seat_number: '20B',
      flight_number: '',
      requiring_wheel_chair: false,
      with_infants: false,
      requiring_special_meal: false,
      is_checkedIn: false,
      shopping_request: false,
      ancillary_services: []
    },
    edit_access: {
      full_name: true,
      passport_number: true,
      address: true,
      date_of_birth: true,
      seat_number: true,
      requiring_wheel_chair: true,
      with_infants: true,
      requiring_special_meal: true,
      ancillary_services: true,
      shopping_request: true,
    },
    services_data: [{
      id: 'a9f88eeb-6e2d-4346-afe6-ed7d3a658001',
      name: 'Extra Luggage',
      price: '350.00',
      type: 'ANC_SER',
      flight_id: ''
    }]
  };
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
      imports: [
        UiModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [ PassengerFormComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        PassengerService,
        provideMockStore({ initialState }),
        { provide: MatDialogRef, useValue: dialogMock },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PassengerFormComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component.title).toEqual('Edit Passenger');
  });

  describe('perform form fields validations', () => {
    it('full_name has less than 3 characters', () => {
      const field = component.passengerForm.controls['full_name'];
      field.setValue('Ab');
      const errors = field.errors || {};
      expect(errors['minlength']).toEqual({requiredLength: 3, actualLength: 2});
    });

    it('address has less than 15 characters', () => {
      const field = component.passengerForm.controls['address'];
      field.setValue('Ab Cd Ef Gh');
      const errors = field.errors || {};
      expect(errors['minlength']).toEqual({requiredLength: 15, actualLength: 11});
    });

    it('passport_number has invalid passport', () => {
      const field = component.passengerForm.controls['passport_number'];
      field.setValue('A123456');
      const errors = field.errors || {};
      expect(errors['pattern']).toEqual({requiredPattern:"/[a-zA-Z]{1}[0-9]{7}/",actualValue:"A123456"});
    });

    it('date_of_birth is not in proper format', () => {
      const field = component.passengerForm.controls['date_of_birth'];
      field.setValue('15-08-1947');
      const errors = field.errors || {};
      expect(errors['pattern']).toEqual({requiredPattern:"/^\\d{4}\\-(0[1-9]|1[012])\\-(0[1-9]|[12][0-9]|3[01])$/",actualValue:"15-08-1947"});
    });
  });
});
