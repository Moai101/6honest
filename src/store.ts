import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { reducer, state } from './states/state';
import thunk from "redux-thunk"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'


export type AppState = {
  state: state
};


// 永続化の設定
const persistConfig = {
  key: 'root', // Storageに保存されるキー名を指定する
  storage, // 保存先としてlocalStorageがここで設定される
  whitelist: ['params'] // Stateは`todos`のみStorageに保存する
  // blacklist: ['visibilityFilter'] // `visibilityFilter`は保存しない
}

// 永続化設定されたReducerとして定義
const persistedReducer = persistReducer(persistConfig, reducer)


const storeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;


const store = createStore(
  persistedReducer,
  storeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store)
export default store;