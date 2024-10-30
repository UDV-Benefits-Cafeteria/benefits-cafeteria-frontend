import { lazy } from "react";

export const DataTableAsync = lazy(
  async () => await import("./DataTable").then(module => ({ default: module.DataTable }))
);
