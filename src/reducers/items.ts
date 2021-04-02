import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../actions";
import { Item } from "../types";

type ItemsState = {
  items: Item[];
  initialized: boolean;
};

const initialState: ItemsState = {
  items: [],
  initialized: false,
};

export default createReducer<ItemsState>(initialState, (builder) => {
  builder
    .addCase(actions.addItem, (state, action) => {
      state.items.push(markDirty({ ...action.payload, id: action.payload.id }));
    })
    .addCase(actions.getAllItemsSucceeded, (state, action) => {
      state.items = action.payload;
      state.initialized = true;
    })
    .addCase(actions.addItemSucceeded, (state, action) => {
      state.items = updateItem(state.items, action.payload, markClean);
    })
    .addCase(actions.addItemFailed, (state, action) => {
      state.items = removeItemById(state.items, action.payload);
    })
    .addCase(actions.removeItem, (state, action) => {
      state.items = updateItem(state.items, action.payload, markDirty);
    })
    .addCase(actions.removeItemSucceeded, (state, action) => {
      state.items = removeItemById(state.items, action.payload);
    })
    .addCase(actions.removeItemFailed, (state, action) => {
      state.items = updateItem(state.items, action.payload, markClean);
    })
    .addCase(actions.editItem, (state, action) => {
      state.items = updateItem(state.items, action.payload.id, (item) =>
        markDirty({
          ...item,
          ...action.payload,
          _previousVersion: item,
        })
      );
    })
    .addCase(actions.editItemSucceeded, (state, action) => {
      state.items = updateItem(state.items, action.payload, markClean);
    })
    .addCase(actions.editItemFailed, (state, action) => {
      state.items = updateItem(state.items, action.payload, (item) =>
        markClean(item._previousVersion || item)
      );
    });
});

function updateItem(items: Item[], id: string, updater: (item: Item) => Item) {
  return updateItems(items, "id", id, updater);
}

function updateItems(
  items: Item[],
  property: string,
  value: string,
  updater: (item: Item) => Item
) {
  return items.map((item) => (item[property] === value ? updater(item) : item));
}

function removeItemById(items: Item[], id: string) {
  return items.filter((item) => item.id !== id);
}

function markDirty(item: Item) {
  return {
    ...item,
    dirty: true,
  };
}

function markClean(item: Item) {
  return {
    ...item,
    dirty: false,
  };
}
