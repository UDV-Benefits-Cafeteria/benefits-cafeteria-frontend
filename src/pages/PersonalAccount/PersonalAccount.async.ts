import { lazy } from "react";

export const PersonalAccountAsync = lazy(
  async () => await import("./PersonalAccount").then(module => ({ default: module.PersonalAccount }))
);
