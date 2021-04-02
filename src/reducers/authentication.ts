import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions";

type AuthenticationState = {
  initialized: boolean;
  loggedIn: boolean;
};

const initialState: AuthenticationState = {
  initialized: false,
  loggedIn: false,
};

export default createReducer<AuthenticationState>(initialState, (builder) => {
  builder
    .addCase(actions.loginSucceeded, (state) => {
      state.initialized = true;
      state.loggedIn = true;
    })
    .addCase(actions.logoutSucceeded, (state) => {
      state.initialized = true;
      state.loggedIn = false;
    });
});
