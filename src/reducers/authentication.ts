import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions";
import { isLoggedIn } from "../services/authenticationService";

type AuthenticationState = {
  initialized: boolean;
  loggedIn: boolean;
  loggingIn: boolean;
  loggingOut: boolean;
  loginError: string;
  logoutError: string;
};

const initialState: AuthenticationState = {
  initialized: false,
  loggedIn: isLoggedIn(),
  loggingIn: false,
  loggingOut: false,
  loginError: "",
  logoutError: "",
};

export default createReducer<AuthenticationState>(initialState, (builder) => {
  builder
    .addCase(actions.login, (state) => {
      state.loggingIn = true;
    })
    .addCase(actions.initializeAuth, (state) => {
      state.initialized = true;
    })
    .addCase(actions.loginSucceeded, (state) => {
      state.loggingIn = false;
      state.loggedIn = true;
      state.loginError = "";
    })
    .addCase(actions.loginFailed, (state, action) => {
      state.loggingIn = false;
      state.loginError = action.payload.message;
    })
    .addCase(actions.logout, (state) => {
      state.loggingOut = true;
    })
    .addCase(actions.logoutSucceeded, (state) => {
      state.loggingOut = false;
      state.loggedIn = false;
      state.logoutError = "";
    })
    .addCase(actions.logoutFailed, (state, action) => {
      state.loggingOut = false;
      state.logoutError = action.payload.message;
    });
});
