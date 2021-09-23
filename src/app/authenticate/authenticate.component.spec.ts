import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialAuthService, SocialAuthServiceConfig } from "angularx-social-login";
import { AuthService } from '../data-access';
import { UiModule } from '../ui/ui.module';
import { AuthenticateComponent } from './authenticate.component';
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";

describe('AuthenticateComponent', () => {
  let store: MockStore;
  let component: AuthenticateComponent;
  let fixture: ComponentFixture<AuthenticateComponent>;
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        UiModule,
        RouterTestingModule
      ],
      declarations: [ AuthenticateComponent ],
      providers: [
        AuthService,
        SocialAuthService,
        {
          provide: 'SocialAuthServiceConfig',
          useValue: {
            autoLogin: false,
            providers: [
              {
                id: GoogleLoginProvider.PROVIDER_ID,
                provider: new GoogleLoginProvider(
                  '848536637117-2kepimg5novf40ronbgmvq5j5mig2mbv.apps.googleusercontent.com'
                )
              },
              {
                id: FacebookLoginProvider.PROVIDER_ID,
                provider: new FacebookLoginProvider('239293898201526')
              }
            ],
            onError: (err) => {
              console.error(err);
            }
          } as SocialAuthServiceConfig,
        },
        provideMockStore({ initialState }),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticateComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
