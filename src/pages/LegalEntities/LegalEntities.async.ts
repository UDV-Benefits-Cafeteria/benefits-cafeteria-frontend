import { lazy } from "react";

export const LegalEntitiesAsync = lazy(
  async () => await import("./LegalEntities").then(module => ({ default: module.LegalEntities }))
);
