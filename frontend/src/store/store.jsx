import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "../slice/authSlice";
import taskReducer from "../slice/taskSlice";
import thunk from "redux-thunk"; // Import Redux Thunk
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storageSession from "redux-persist/lib/storage/session";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: storageSession,
  stateReconciler: autoMergeLevel2,
};

const rootReducer = combineReducers({
  auth: authReducer,
  tasks: taskReducer,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk], // Add Redux Thunk middleware
});

export const persistor = persistStore(store);
