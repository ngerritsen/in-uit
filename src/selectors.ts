import { RootState } from "./store";
import * as helpers from "./helpers/items";
import { ItemType, Responsible } from "./constants";
import { Item, Category, Summary } from "./types";
import { calculateSummary } from "./helpers/calculate";

export const getItems = (state: RootState): Item[] => state.items.items;

export const getHasDirtyItems = (state: RootState): boolean => Boolean(state.items.items.some((item) => item.dirty));

export const getIsLoading = (state: RootState): boolean =>
  (getIsLoggingIn(state) && !getIsItemsInitialized(state)) || !getIsAuthInitialized(state);

export const getIsAuthInitialized = (state: RootState): boolean => state.authentication.initialized;

export const getIsItemsInitialized = (state: RootState): boolean => state.items.initialized;

export const getIsLoggedIn = (state: RootState): boolean => state.authentication.loggedIn;

export const getIsLoggingIn = (state: RootState): boolean => state.authentication.loggingIn;

export const getIsLoggingOut = (state: RootState): boolean => state.authentication.loggingOut;

export const getLoginError = (state: RootState): string => state.authentication.loginError;

export const getGroupedItems = (state: RootState, itemType: ItemType, responsible: Responsible): Category[] =>
  helpers.getGroupedItems(getItems(state), itemType, responsible);

export const getSummmary = (state: RootState, itemType: ItemType, responsible: Responsible): Summary | null =>
  itemType === ItemType.Expense ? calculateSummary(getItems(state), responsible) : null;
