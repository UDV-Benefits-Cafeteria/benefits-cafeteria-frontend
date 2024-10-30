/* eslint-disable camelcase */
import { type PayloadAction, createSlice } from "@reduxjs/toolkit";

import type { TBenefit } from "@entity/Benefit/model/types/Benefit.types";

const initialState: TBenefit = {
  name: "",
  category_id: 0,
  is_active: 0,
  description: "",
  real_currency_cost: 0,
  amount: 0,
  is_fixed_period: false,
  usage_limit: 0,
  usage_period_days: 0,
  coins_cost: 0,
  min_level_cost: 0,
  adaptation_required: false,
};

type TSetTBenefitData<T extends keyof TBenefit> = {
  field: T;
  value: TBenefit[T];
};

export const CreateBenefitFormSlice = createSlice({
  name: "CreateBenefitForm",
  initialState,
  reducers: {
    setInitialState: (state, action: PayloadAction) => {
      return initialState;
    },
    setBenefitData: (state, action: PayloadAction<TSetTBenefitData<keyof TBenefit>>) => {
      const { field, value } = action.payload;

      (state[field] as typeof value) = value;
    },
    setFormData: (state, action: PayloadAction<TBenefit>) => {
      return { ...action.payload };
    },
  },
});

// Action creators are generated for each case reducer function
export const { actions: CreateBenefitFormActions } = CreateBenefitFormSlice;
export const { reducer: CreateBenefitFormReducer } = CreateBenefitFormSlice;
