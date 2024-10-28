import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TPosition } from "@entity/Position/model/types/Position.types";

const initialState: { positions: TPosition[] } = {
  positions: [],
};

export const PositionSlice = createSlice({
  name: "Position",
  initialState,
  reducers: {
    setPositions: (state, action: PayloadAction<TPosition[]>) => {
      state.positions = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: PositionSliceActions } = PositionSlice;
export const { reducer: PositionSliceReducer } = PositionSlice;
