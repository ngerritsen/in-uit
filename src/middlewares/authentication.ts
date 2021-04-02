/* eslint-disable no-console */

import { createActionHandler } from "redux-map-action-handlers";

import * as authenticationService from "../services/authenticationService";
import * as actions from "../actions";
import { Action, Dispatch, Store } from "redux";
import { RootState } from "../store";
import { PayloadAction } from "@reduxjs/toolkit";

const handleAction = createActionHandler({
  [actions.login.toString()]: login,
  [actions.logout.toString()]: logout,
});

export default authenticationMiddleware;

function authenticationMiddleware(store: Store<RootState>) {
  authenticationService.onLoginStateChange((loggedIn: boolean) => {
    const { authentication } = store.getState();

    if (loggedIn && !authentication.loggedIn) {
      store.dispatch(actions.loginSucceeded());
      store.dispatch(actions.getAllItems());
    }

    if (!loggedIn && (authentication.loggedIn || !authentication.initialized)) {
      store.dispatch(actions.logoutSucceeded());
    }
  });

  return (next: Dispatch) => (action: Action) => {
    handleAction(store, action);

    return next(action);
  };
}

async function login(
  store: Store<RootState>,
  action: PayloadAction<actions.LoginPayload>
) {
  try {
    await authenticationService.login(
      action.payload.email,
      action.payload.password
    );
    store.dispatch(actions.loginSucceeded());
    store.dispatch(actions.getAllItems());
  } catch (error) {
    console.error(error);
    store.dispatch(actions.loginFailed());
  }
}

async function logout(store: Store<RootState>) {
  try {
    await authenticationService.logout();
    store.dispatch(actions.logoutSucceeded());
  } catch (error) {
    console.error(error);
    store.dispatch(actions.logoutFailed());
  }
}
