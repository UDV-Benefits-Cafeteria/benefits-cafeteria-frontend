import { lazy } from "react";

export const EmployeeEditAsync = lazy(
  async () => await import("./EmployeeEdit").then(module => ({ default: module.EmployeeEdit }))
);
