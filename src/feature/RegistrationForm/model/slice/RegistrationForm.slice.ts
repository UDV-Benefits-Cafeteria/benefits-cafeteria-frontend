import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TRegistrationFormSliceSchema } from "../types/RegistrationForm.types";

const initialState: TRegistrationFormSliceSchema = {};

export const RegistrationFormSlice = createSlice({
  name: "RegistrationForm",
  initialState,
  reducers: {
    setId: (state, action: PayloadAction<number>) => {
      state.id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: RegistrationFormSliceActions } = RegistrationFormSlice;
export const { reducer: RegistrationFormSliceReducer } = RegistrationFormSlice;
