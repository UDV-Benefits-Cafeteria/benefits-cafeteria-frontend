import { lazy } from "react";

export const EmployeesAsync = lazy(
  async () => await import("./Employees").then(module => ({ default: module.Employees }))
);
