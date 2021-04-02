/* eslint-disable no-console */

import { mapActionHandlers } from "redux-map-action-handlers";

import * as itemsRepository from "../services/itemsRepository";
import * as actions from "../actions";
import { PayloadAction, Store } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Item } from "../types";

export default mapActionHandlers({
  [actions.getAllItems.toString()]: getAllItems,
  [actions.addItem.toString()]: addItem,
  [actions.editItem.toString()]: editItem,
  [actions.removeItem.toString()]: removeItem,
});

async function getAllItems(store: Store<RootState>) {
  try {
    const items = await itemsRepository.getAll();
    store.dispatch(actions.getAllItemsSucceeded(items));
  } catch (error) {
    console.error(error);
    store.dispatch(actions.getAllItemsFailed());
  }
}

async function addItem(
  store: Store<RootState>,
  { payload: item }: PayloadAction<Item>
) {
  try {
    await itemsRepository.add(item);
    store.dispatch(actions.addItemSucceeded(item.id));
  } catch (error) {
    console.error(error);
    store.dispatch(actions.addItemFailed(item.id));
  }
}

async function editItem(
  store: Store<RootState>,
  { payload: item }: PayloadAction<Item>
) {
  try {
    await itemsRepository.edit(item);
    store.dispatch(actions.editItemSucceeded(item.id));
  } catch (error) {
    console.error(error);
    store.dispatch(actions.editItemFailed(item.id));
  }
}

async function removeItem(
  store: Store<RootState>,
  { payload: id }: PayloadAction<string>
) {
  try {
    await itemsRepository.remove(id);
    store.dispatch(actions.removeItemSucceeded(id));
  } catch (error) {
    console.error(error);
    store.dispatch(actions.removeItemFailed(id));
  }
}
