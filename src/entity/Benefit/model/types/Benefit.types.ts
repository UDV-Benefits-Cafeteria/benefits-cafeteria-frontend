import type { TCategory } from "@entity/Category/model/types/Category.types";

export type TBenefit = {
  name: string;
  category_id: number;
  is_active: boolean;
  description: string;
  real_currency_cost: number;
  amount: number;
  is_fixed_period: boolean;
  usage_limit: number;
  usage_period_days?: number;
  period_start_date?: string;
  available_from?: string;
  available_by?: string;
  coins_cost: number;
  min_level_cost: number;
  adaptation_required: boolean;
};

export type TBenefitData = {
  usage_limit: number;
  is_fixed_period: boolean;
  usage_period_days?: number;
  description: string;
  adaptation_required: boolean;
  category: TCategory;
  is_active: boolean;
  id: number;
  name: string;
  coins_cost: number;
  min_level_cost: number;
  amount: number;
  primary_image_url: string;
  real_currency_cost: number;
  images: benefitImages[];
};

type benefitImages = {
  image_url: string;
  benefit_id: 0;
  is_primary: false;
  description: string;
  id: 0;
};
