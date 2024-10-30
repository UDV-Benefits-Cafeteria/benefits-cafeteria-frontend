import { lazy } from "react";

export const BenefitsAsync = lazy(
  async () => await import("./Benefits").then(module => ({ default: module.Benefits }))
);
