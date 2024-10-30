import { lazy } from "react";

export const BenefitPageAsync = lazy(
  async () => await import("./BenefitPage").then(module => ({ default: module.BenefitPage }))
);
