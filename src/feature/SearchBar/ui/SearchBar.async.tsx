import { lazy } from "react";

export const SearchBarAsync = lazy(
  async () => await import("./SearchBar").then(module => ({ default: module.SearchBar }))
);
