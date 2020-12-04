import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer, state } from './states/state';
import thunk from "redux-thunk"


export type AppState = {
  state: state
};

const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  combineReducers<AppState>({
    state: reducer
  }),
  storeEnhancers(applyMiddleware(thunk))
);

export default store;