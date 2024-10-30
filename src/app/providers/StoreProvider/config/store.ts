import { CategorySliceReducer } from "@entity/Category/model/slice/Category.slice";
import { LegalEntitiesReducer } from "@entity/LegalEntities/model/slice/LegalEntities.slice";
import { PositionSliceReducer } from "@entity/Position/model/slice/User.slice";
import { UserSliceReducer } from "@entity/User";
import { RegistrationFormSliceReducer } from "@feature/RegistrationForm";
import { configureStore } from "@reduxjs/toolkit";
import { rtkApi } from "@shared/api/rtkApi";
import { CreateBenefitFormReducer } from "@widgets/CreateBenefitForm/model/slice/CreateBenefitForm.slice";
import { CreateEmployeeFormReducer } from "@widgets/CreateEmployeeForm/model/slice/CreateEmployeeForm.slice";

export const store = configureStore({
  reducer: {
    [rtkApi.reducerPath]: rtkApi.reducer,
    user: UserSliceReducer,
    registrationForm: RegistrationFormSliceReducer,
    createEmployeeForm: CreateEmployeeFormReducer,
    positions: PositionSliceReducer,
    legalEntities: LegalEntitiesReducer,
    createBenefitForm: CreateBenefitFormReducer,
    category: CategorySliceReducer,
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
