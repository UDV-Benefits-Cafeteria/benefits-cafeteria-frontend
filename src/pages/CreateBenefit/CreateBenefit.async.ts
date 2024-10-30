import { lazy } from "react";

export const CreateBenefitAsync = lazy(
  async () => await import("./CreateBenefit").then(module => ({ default: module.CreateBenefit }))
);
