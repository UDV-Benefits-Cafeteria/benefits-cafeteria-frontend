import { lazy } from "react";

export const RegisterPage = lazy(
  async () => await import("./index").then(module => ({ default: module.RegisterPage }))
);
