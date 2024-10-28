import { lazy } from "react";

export const CreateEmployeeAsync = lazy(
  async () => await import("./CreateEmployee").then(module => ({ default: module.CreateEmployee }))
);
