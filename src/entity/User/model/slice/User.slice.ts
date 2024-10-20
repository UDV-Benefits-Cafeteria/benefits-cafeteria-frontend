import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TUserSliceSchema } from "../types/User.types";

const initialState: TUserSliceSchema = {
  isAuth: false,
  isMounted: false,
  role: "employee",
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      state.isMounted = true;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;
