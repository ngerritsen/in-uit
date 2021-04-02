import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import authenticationMiddleware from "./middlewares/authentication";
import itemsMiddleware from "./middlewares/items";
import * as reducers from "./reducers";
import { Middleware } from "redux";

const middlewares: Middleware[] = [authenticationMiddleware, itemsMiddleware];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV !== "production") {
  middlewares.push(
    createLogger({
      collapsed: true,
    })
  );
}

const store = configureStore({
  reducer: reducers,
  middleware: middlewares,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
