import { createReducer, on, Action } from '@ngrx/store';
import { AncillaryServiceStateInterface, initialAncillaryServiceState } from '../states.models';
import * as AncillaryServiceActions from '../actions/ancillary-service.actions';

export const ancillaryServiceFeatureKey = 'AncillaryServiceState';

export const reducer = createReducer(
  initialAncillaryServiceState,
  on(AncillaryServiceActions.setAncillaryServicesData, (state, ancillaryService) => ({
    ...state,
    ...ancillaryService
  })),
  on(AncillaryServiceActions.updateAncillaryServiceData, (state, ancillaryService) => ({
    ...state,
    ...ancillaryService
  }))
);

export function AncillaryServiceReducer(state: AncillaryServiceStateInterface | undefined, action: Action): AncillaryServiceStateInterface {
  return reducer(state as AncillaryServiceStateInterface, action as Action);
}