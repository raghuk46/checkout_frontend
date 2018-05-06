import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";

import rootReducer from "../reducers";

let middleware = [thunk];

if (process.env.NODE_ENV === "development") {
  middleware = [...middleware, createLogger({ diff: true, collapsed: true })];
}

const createStoreWithMiddleware = compose(applyMiddleware(...middleware))(
  createStore
);

export default function configureStore(initalState = {}) {
  return createStoreWithMiddleware(rootReducer, initalState);
}
