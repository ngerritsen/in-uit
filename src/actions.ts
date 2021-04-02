import { createAction } from "@reduxjs/toolkit";
import { Item } from "./types";

export type LoginPayload = {
  email: string;
  password: string;
};

export const login = createAction<LoginPayload>("authentication/login");
export const loginSucceeded = createAction("authentication/loginSucceeded");
export const loginFailed = createAction("authentication/loginFailed");

export const logout = createAction("authentication/logout");
export const logoutSucceeded = createAction("authentication/logoutSucceeded");
export const logoutFailed = createAction("authentication/logoutFailed");

export const getAllItems = createAction("items/getAll");
export const getAllItemsSucceeded = createAction<Item[]>(
  "items/getAllSucceeded"
);
export const getAllItemsFailed = createAction("items/getAllFailed");

export const addItem = createAction<Item>("items/add");
export const addItemSucceeded = createAction<string>("items/addSucceeded");
export const addItemFailed = createAction<string>("items/addFailed");

export const removeItem = createAction<string>("items/remove");
export const removeItemSucceeded = createAction<string>(
  "items/removeSucceeded"
);
export const removeItemFailed = createAction<string>("items/removeFailed");

export const editItem = createAction<Item>("items/edit");
export const editItemSucceeded = createAction<string>("items/editSucceeded");
export const editItemFailed = createAction<string>("items/editFailed");
