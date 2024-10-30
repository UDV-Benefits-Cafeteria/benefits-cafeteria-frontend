import { lazy } from "react";

export const BenefitEditAsync = lazy(
  async () => await import("./BenefitEdit").then(module => ({ default: module.BenefitEdit }))
);
