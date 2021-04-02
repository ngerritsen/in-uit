import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";

import * as reducers from "./reducers";
import { createEpicMiddleware } from "redux-observable";
import rootEpic from "./epics";

const epicMiddleware = createEpicMiddleware();
const middlewares = [epicMiddleware];

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

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export default store;
