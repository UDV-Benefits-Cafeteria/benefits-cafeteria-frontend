import { lazy } from "react";

export const PreLandingAsync = lazy(
  async () => await import("./PreLanding").then(module => ({ default: module.PreLanding }))
);
