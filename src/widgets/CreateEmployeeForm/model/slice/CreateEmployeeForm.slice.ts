/* eslint-disable camelcase */
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TUserData } from "@entity/User/model/types/User.types";

const initialState: TUserData = {
  email: "",
  firstname: "",
  lastname: "",
  middlename: "",
  coins: 0,
  role: "employee",
  hired_at: "",
  is_active: false,
  is_verified: false,
  is_adapted: false,
  id: -1,
  position: null,
  legal_entity: null,
  experience: 0,
  level: 0,
};

type TSetUserData<T extends keyof TUserData> = {
  field: T;
  value: TUserData[T];
};

export const CreateEmployeeFormSlice = createSlice({
  name: "CreateEmployeeForm",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction) => {
      return initialState;
    },
    setUserData: (state, action: PayloadAction<TSetUserData<keyof TUserData>>) => {
      const { field, value } = action.payload;

      (state[field] as typeof value) = value;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: CreateEmployeeFormActions } = CreateEmployeeFormSlice;
export const { reducer: CreateEmployeeFormReducer } = CreateEmployeeFormSlice;
