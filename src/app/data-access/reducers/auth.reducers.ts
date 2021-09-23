import { createReducer, on, Action } from '@ngrx/store';
import { AuthStateInterface, initialAuthState } from '../states.models';
import * as AuthActions from '../actions/auth.actions';

export const userFeatureKey = 'AuthState';

export const reducer = createReducer(
  initialAuthState,
  on(AuthActions.socialSignInSuccess, (state, user) => ({
    ...state,
    ...user
  })),
  on(AuthActions.socialSignInFailed, (state) => ({
    ...state,
    ...initialAuthState
  })),
  on(AuthActions.socialSignOut, (state) => ({
    ...state,
    ...initialAuthState
  })),
  on(AuthActions.setRole, (state, data) => ({
    ...state,
    ...data
  }))
);

export function AuthReducer(state: AuthStateInterface | undefined, action: Action): AuthStateInterface {
  return reducer(state as AuthStateInterface, action as Action);
}