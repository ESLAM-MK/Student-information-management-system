import { applyMiddleware, createStore } from 'redux';
import { routeReducer } from './RouteReduser';
import thunk from 'redux-thunk';

const middleWarw = [thunk];
const initailState = {};

const store = createStore(
  routeReducer,
  initailState,
  applyMiddleware(...middleWarw)
);

export default store;
