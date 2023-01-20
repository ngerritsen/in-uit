import { combineEpics } from "redux-observable";
import * as itemEpics from "./items";
import * as authenticationEpics from "./authentication";

export default combineEpics(
  itemEpics.addItemEpic,
  itemEpics.getAllItemsEpic,
  itemEpics.editItemEpic,
  itemEpics.removeItemEpic,
  authenticationEpics.authenticationStateChangeEpic,
  authenticationEpics.loginEpic,
  authenticationEpics.logoutEpic
);
