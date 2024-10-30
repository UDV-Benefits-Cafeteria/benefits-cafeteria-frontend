import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import { TCategory } from "@entity/Category/model/types/Category.types";

const initialState: { category: TCategory[] } = {
  category: [],
};

export const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<TCategory[]>) => {
      state.category = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: CategorySliceActions } = CategorySlice;
export const { reducer: CategorySliceReducer } = CategorySlice;
