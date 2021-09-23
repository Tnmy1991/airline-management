import { createFeatureSelector, createSelector } from '@ngrx/store';
import { userFeatureKey } from '../reducers/auth.reducers';
import { AuthStateInterface } from '../states.models';

const userDetails = createFeatureSelector<AuthStateInterface>(
  userFeatureKey
);

export const getUserDetails = createSelector(
  userDetails,
  (state: AuthStateInterface) => {
    return state;
  }
);

export const getUserRole = createSelector(
  userDetails,
  (state: AuthStateInterface) => {
    return state.role;
  }
);