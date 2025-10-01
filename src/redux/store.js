import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Reducers
import authRecuder from "./auth/slice.js";
import publicCalculatorReducer from "./publicCalculator/slice.js";
import productsReducer from "./products/slice.js";
import userDiaryReducer from "./userDiary/slice.js";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const userDiaryPersistConfig = {
  key: "userDiary",
  storage,
  whitelist: ["selectedDate"],
};

const authPersisteredReducer = persistReducer(authPersistConfig, authRecuder);
const userDiaryPersisteredReducer = persistReducer(
  userDiaryPersistConfig,
  userDiaryReducer
);

export const store = configureStore({
  reducer: {
    auth: authPersisteredReducer,
    publicCalculator: publicCalculatorReducer,
    products: productsReducer,
    userDiary: userDiaryPersisteredReducer,
  },
});

export let persistor = persistStore(store);
