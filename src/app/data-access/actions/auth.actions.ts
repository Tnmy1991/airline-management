import {createAction, props } from '@ngrx/store';
import { SocialUser } from "angularx-social-login";

export const socialSignInSuccess = createAction(
  '[Auth] Social Sing-In Success',
  props<SocialUser>()
);

export const socialSignInFailed = createAction(
  '[Auth] Social Sing-In Failed'
);

export const setRole = createAction(
  '[Auth] Assign Role Success',
  props<{role: string}>()
);

export const socialSignOut = createAction(
  '[Auth] Logout Success'
);