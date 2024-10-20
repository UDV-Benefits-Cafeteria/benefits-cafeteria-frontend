import { lazy } from "react";

export const RegisterPageAsync = lazy(
  async () => await import("./RegisterPage").then(module => ({ default: module.RegisterPage }))
);
