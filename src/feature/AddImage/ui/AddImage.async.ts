import { lazy } from "react";

export const AddImageAsync = lazy(
  async () => await import("./AddImage").then(module => ({ default: module.AddImage }))
);
