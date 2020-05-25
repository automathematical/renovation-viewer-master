import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import { loadState, saveState } from "./components/localStorage/loadState";
import throttle from "lodash/throttle";

// const initialstate = {};
// initial state is now persistedState in fact too much of a hassle to change everything
const initialstate = loadState();
const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialstate,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

export default store;
