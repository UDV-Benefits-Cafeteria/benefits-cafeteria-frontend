import { lazy } from "react";

export const AuthorizationPageAsync = lazy(
  async () => await import("./AuthorizationPage").then(module => ({ default: module.AuthorizationPage }))
);
