import { lazy } from "react";

export const BenefitsBarAsync = lazy(
  async () => await import("./BenefitsBar").then(module => ({ default: module.BenefitsBar }))
);
