import {createAction, props } from '@ngrx/store';
import { AncillaryServiceStateInterface } from '../states.models';

export const loadAncillaryServicesData = createAction('[AncillaryService] Ancillary Service Data Loading');

export const setAncillaryServicesData = createAction(
  '[AncillaryService] Ancillary Service Data Set Success',
  props<AncillaryServiceStateInterface>()
);

export const updateAncillaryServiceData = createAction(
  '[AncillaryService] Ancillary Service Update Success',
  props<AncillaryServiceStateInterface>()
);