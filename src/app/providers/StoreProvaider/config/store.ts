import { configureStore } from "@reduxjs/toolkit";
import { rtkApi } from "@shared/api/rtkApi";

import { StateSchema } from "../index";

export const createStore = (initialState?: StateSchema) => {
  return configureStore({
    reducer: {
      [rtkApi.reducerPath]: rtkApi.reducer,
    },
    // @ts-ignore
    devTools: __DEV__,
    preloadedState: initialState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
        immutableCheck: false,
      }).concat(rtkApi.middleware),
  });
};

export type AppDispatch = ReturnType<typeof createStore>["dispatch"];
