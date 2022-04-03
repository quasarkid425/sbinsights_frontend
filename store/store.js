import { configureStore } from "@reduxjs/toolkit";
import storage from "../utils/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import userReducer from "./userSlice";
import accountReducer from "./accountSlice";
import employeeReducer from "./employeeSlice";
import expenseReducer from "./expenseSlice";
import taxReducer from "./taxSlice";
import chartReducer from "./chartSlice";

import { getDefaultMiddleware } from "@reduxjs/toolkit";

const reducers = combineReducers({
  user: userReducer,
  accounts: accountReducer,
  employees: employeeReducer,
  expenses: expenseReducer,
  taxes: taxReducer,
  charts: chartReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
