import { lazy } from "react";

export const InputFromAsync = lazy(
  async () => await import("./InputFrom").then(module => ({ default: module.InputFrom }))
);
