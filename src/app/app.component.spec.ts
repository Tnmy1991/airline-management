import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { UiModule } from './ui/ui.module';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AppComponent', () => {
  let store: MockStore;
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let routerSpy = {navigate: jasmine.createSpy('navigate')};
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
      flights: []
    },
    PassengerState: {
      passengers: []
    },
    AncillaryServiceState: {
      ancillary_service: []
    } 
  }

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        provideMockStore({ initialState }),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect (routerSpy.navigate).toHaveBeenCalledWith(['/application/admin']);
  });
  
});
