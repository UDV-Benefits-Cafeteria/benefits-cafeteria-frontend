import { lazy } from "react";

export const ApplicationsAsync = lazy(
  async () => await import("./Applications").then(module => ({ default: module.Applications }))
);
