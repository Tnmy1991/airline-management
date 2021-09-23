import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ancillaryServiceFeatureKey } from '../reducers/ancillary-service.reducers';
import { AncillaryServiceStateInterface } from '../states.models';

const ancillaryServicesDetails = createFeatureSelector<AncillaryServiceStateInterface>(
  ancillaryServiceFeatureKey
);

export const getAncillaryServices = createSelector(
  ancillaryServicesDetails,
  (state: AncillaryServiceStateInterface) => {
    return state.ancillary_service;
  }
);
