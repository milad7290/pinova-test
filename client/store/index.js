import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../reducers/index";

export function configureStore(initialState = {}) {
  const enhancers = [applyMiddleware(thunk)];
  const store = createStore(rootReducer, initialState, compose(...enhancers));

  if (module.hot) {
    module.hot.accept("../reducers/index", () => {
      const nextReducer = require("../reducers/index").default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
