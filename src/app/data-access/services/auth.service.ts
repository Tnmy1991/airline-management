import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, AuthStateInterface } from '../states.models';
import { SocialUser } from "angularx-social-login";
import * as AuthActions from '../actions/auth.actions';
import { getUserDetails, getUserRole } from '../selectors/auth.selectors';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private store: Store<AppState>) {}

  getUserData(): Observable<AuthStateInterface> {
    return this.store.select(
      getUserDetails
    );
  }

  getUserRole(): Observable<string> {
    return this.store.select(
      getUserRole
    );
  }

  socialSignInSuccess(user: SocialUser): void {
    this.store.dispatch(
      AuthActions.socialSignInSuccess(user)
    );
  }

  assignRole(role: string): void {
    this.store.dispatch(
      AuthActions.setRole({role: role})
    );
  }


  socialSignInFailed(): void {
    this.store.dispatch(
      AuthActions.socialSignInFailed()
    );
  }

  socialSignOut(): void {
    this.store.dispatch(
      AuthActions.socialSignOut()
    );
  }
}
