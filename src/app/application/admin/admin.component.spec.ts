import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { 
  FlightService,
  PassengerService, 
  DataInteractionService,  
  AncillaryServicesService
} from '../../data-access';
import {
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatBottomSheet, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { AdminComponent } from './admin.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UiModule } from '../../ui/ui.module';
import { of as observableOf } from 'rxjs';

class MockDialog {
  open(): Object {
    return {
      afterClosed: () => observableOf({}),
    };
  }
}

describe('AdminComponent', () => {
  let dialog: MatDialog;
  let store: MockStore;
  let bottomSheet: MatBottomSheet;
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
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
  const dialogMockRef = {
    close: () => {},
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [ AdminComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FlightService,
        PassengerService, 
        DataInteractionService,  
        AncillaryServicesService,
        provideMockStore({ initialState }),
        { provide: MatDialogRef, useValue: dialogMockRef },
        { provide: MatDialog, useValue: new MockDialog() },
        { provide: MatBottomSheetRef, useValue: dialogMockRef },
        { provide: MatBottomSheet, useValue: new MockDialog() },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    bottomSheet = TestBed.inject(MatBottomSheet);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call ngOnInit', () => {
    component.ngOnInit();
    expect(component.passengersData).toHaveSize(1);
    expect(component.servicesData).toHaveSize(2);
  });

  it('should call handleEditOperation() for passenger', () => {
    const data = {
      type: 'Passengers',
      data: {
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
      }
    };
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.handleEditOperation(data);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleEditOperation() for service', () => {
    const data = {
      type: 'Ancillary Services',
      data: {
        id: 'd2872f09-b058-424d-901d-9e9bc112e97d',
        name: 'Cardamom Tea',
        type: 'ANC_SER',
        price: '100',
        flight_id: ''
      }
    };
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.handleEditOperation(data);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleAddOperation() for passenger', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.handleAddOperation('Passengers');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleAddOperation() for service', () => {
    const spy = spyOn(dialog, 'open').and.callThrough();
    component.handleAddOperation('Ancillary Services');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should call handleFilterOperation()', () => {
    const spy = spyOn(bottomSheet, 'open').and.callThrough();
    component.handleFilterOperation();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
