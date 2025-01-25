import AsyncStorage from "@react-native-async-storage/async-storage";

import * as sliceKeys from "./sliceKeys";
import { persistReducer } from "redux-persist";
import { combineReducers } from "redux";

import memoReducer from "./slice/memo";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [sliceKeys.MEMO_SLICE],
};

const combineReducer = combineReducers({
  [sliceKeys.MEMO_SLICE]: memoReducer,
});

const persistedReducer = persistReducer(persistConfig, combineReducer);

export default persistedReducer;
