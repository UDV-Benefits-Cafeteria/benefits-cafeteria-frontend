import { UserSliceReducer } from "@entity/User";
import { RegistrationFormSliceReducer } from "@feature/RegistrationForm";
import { configureStore } from "@reduxjs/toolkit";
import { rtkApi } from "@shared/api/rtkApi";

export const store = configureStore({
  reducer: {
    [rtkApi.reducerPath]: rtkApi.reducer,
    user: UserSliceReducer,
    registrationForm: RegistrationFormSliceReducer,
  },
  devTools: true,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat(rtkApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
