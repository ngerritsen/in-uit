import { ActionsObservable, ofType, StateObservable } from "redux-observable";
import {
  catchError,
  mapTo,
  mergeMap,
  mergeMapTo,
  withLatestFrom,
} from "rxjs/operators";
import { getIsLoggedIn } from "../selectors";
import * as authenticationService from "../services/authenticationService";
import * as actions from "../actions";
import { RootState } from "../store";
import { empty, EMPTY, from, of } from "rxjs";
import { Action } from "redux";
import { PayloadAction } from "@reduxjs/toolkit";

export const authenticationStateChangeEpic = (
  _: unknown,
  state$: StateObservable<RootState>
) =>
  authenticationService.onLoginStateChange().pipe(
    withLatestFrom(state$),
    mergeMap(([loggedIn, state]: [boolean, RootState]) => {
      if (loggedIn && !getIsLoggedIn(state)) {
        return of(actions.loginSucceeded(), actions.getAllItems());
      }

      if (!loggedIn && getIsLoggedIn(state)) {
        return of(actions.logoutSucceeded());
      }

      return EMPTY;
    })
  );

export const initiallyLoggedInEpic = (
  _: unknown,
  state$: StateObservable<RootState>
) => (getIsLoggedIn(state$.value) ? of(actions.getAllItems()) : empty());

export const loginEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.login),
    mergeMap(
      ({ payload: { email, password } }: PayloadAction<actions.LoginPayload>) =>
        from(authenticationService.login(email, password)).pipe(
          mergeMapTo(of(actions.loginSucceeded(), actions.getAllItems())),
          catchError((error) => of(actions.loginFailed(error)))
        )
    )
  );

export const logoutEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.logout),
    mergeMap(() =>
      from(authenticationService.logout()).pipe(
        mapTo(actions.logoutSucceeded()),
        catchError((error) => of(actions.logoutFailed(error)))
      )
    )
  );
