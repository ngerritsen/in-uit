import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import {
  catchError,
  map,
  mapTo,
  mergeMap,
  mergeMapTo,
  withLatestFrom,
} from "rxjs/operators";
import { getIsAuthenticationInitialized, getIsLoggedIn } from "../selectors";
import * as authenticationService from "../services/authenticationService";
import * as actions from "../actions";
import { RootState } from "../store";
import { EMPTY, from, of } from "rxjs";
import { Action } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";

export const authenticationStateChangeEpic = (
  _,
  state$: StateObservable<RootState>
) =>
  authenticationService.onLoginStateChange().pipe(
    withLatestFrom(state$),
    mergeMap(([loggedIn, state]: [boolean, RootState]) => {
      if (loggedIn && !getIsLoggedIn(state)) {
        return of(actions.loginSucceeded(), actions.getAllItems());
      }

      if (
        !loggedIn &&
        (getIsLoggedIn(state) || !getIsAuthenticationInitialized(state))
      ) {
        return of(actions.logoutSucceeded());
      }

      return EMPTY;
    })
  );

export const loginEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.login),
    mergeMap(
      ({ payload: { email, password } }: PayloadAction<actions.LoginPayload>) =>
        from(authenticationService.login(email, password)).pipe(
          mergeMapTo(of(actions.loginSucceeded(), actions.getAllItems())),
          catchError(() => of(actions.loginFailed()))
        )
    )
  );

export const logoutEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.logout),
    mergeMap(() =>
      from(authenticationService.logout()).pipe(
        mapTo(actions.logoutSucceeded()),
        catchError(() => of(actions.logoutFailed()))
      )
    )
  );
