import { RootState } from "./store";
import * as helpers from "./helpers/items";
import { ItemType, Responsible } from "./constants";
import { Item, Category } from "./types";
import { calculateSummary } from "./helpers/calculate";

export const getItems = (state: RootState): Item[] => state.items.items;
export const getHasDirtyItems = (state: RootState): boolean =>
  Boolean(state.items.items.some((item) => item.dirty));

export const getIsInitialized = (state: RootState): boolean =>
  state.items.initialized;

export const getIsAuthenticationInitialized = (state: RootState): boolean =>
  state.authentication.initialized;

export const getIsLoggedIn = (state: RootState): boolean =>
  state.authentication.loggedIn;

export const getGroupedItems = (
  state: RootState,
  itemType: ItemType,
  responsible: Responsible
): Category[] =>
  helpers.getGroupedItems(getItems(state), itemType, responsible);

export const getSummmary = (
  state: RootState,
  itemType: ItemType,
  responsible: Responsible
): Record<string, number> | null =>
  itemType === ItemType.Expense
    ? calculateSummary(getItems(state), responsible)
    : null;
