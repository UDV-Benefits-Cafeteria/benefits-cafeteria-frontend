import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TLegalEntity } from "@entity/LegalEntities/model/types/LegalEntities.types";

const initialState: { legalEntities: TLegalEntity[] } = {
  legalEntities: [],
};

export const LegalEntitiesSlice = createSlice({
  name: "LegalEntities",
  initialState,
  reducers: {
    setLegalEntities: (state, action: PayloadAction<TLegalEntity[]>) => {
      state.legalEntities = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: LegalEntitiesActions } = LegalEntitiesSlice;
export const { reducer: LegalEntitiesReducer } = LegalEntitiesSlice;
