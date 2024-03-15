import connectionStatusSlice from "./connectionStatusSlice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import hardSet from "redux-persist/lib/stateReconciler/hardSet";
import storage from "redux-persist/lib/storage";
import usernameSlice from "./usernameSlice";

const rootReducer: any = combineReducers({
  connectionStatus: connectionStatusSlice?.reducer,
  username: usernameSlice?.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  stateReconciler: hardSet,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
