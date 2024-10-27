import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TUserData, TUserSliceSchema } from "../types/User.types";

const initialState: TUserSliceSchema = {
  isAuth: false,
  isMounted: false,
};

export const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
      state.isMounted = true;
    },
    setUser: (state, action: PayloadAction<TUserData>) => {
      state.isAuth = true;
      state.isMounted = true;
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: UserSliceActions } = UserSlice;
export const { reducer: UserSliceReducer } = UserSlice;
