import { PayloadAction } from "@reduxjs/toolkit";
import { Action } from "redux";
import { ActionsObservable, ofType } from "redux-observable";
import { catchError, map, mergeMap } from "rxjs/operators";
import { from, of } from "rxjs";

import * as actions from "../actions";
import { Item } from "../types";
import * as itemsRepository from "../services/itemsRepository";

export const getAllItemsEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.getAllItems),
    mergeMap(() =>
      from(itemsRepository.getAll()).pipe(
        map((items: Item[]) => actions.getAllItemsSucceeded(items)),
        catchError(() => of(actions.getAllItemsFailed()))
      )
    )
  );

export const addItemEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.addItem),
    mergeMap(({ payload: item }: PayloadAction<Item>) =>
      from(itemsRepository.add(item)).pipe(
        map(() => actions.addItemSucceeded(item.id)),
        catchError(() => of(actions.addItemFailed(item.id)))
      )
    )
  );

export const editItemEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.editItem),
    mergeMap(({ payload: item }: PayloadAction<Item>) =>
      from(itemsRepository.edit(item)).pipe(
        map(() => actions.editItemSucceeded(item.id)),
        catchError(() => of(actions.editItemFailed(item.id)))
      )
    )
  );

export const removeItemEpic = (action$: ActionsObservable<Action>) =>
  action$.pipe(
    ofType(actions.removeItem),
    mergeMap(({ payload: id }: PayloadAction<string>) =>
      from(itemsRepository.remove(id)).pipe(
        map(() => actions.removeItemSucceeded(id)),
        catchError(() => of(actions.removeItemFailed(id)))
      )
    )
  );
