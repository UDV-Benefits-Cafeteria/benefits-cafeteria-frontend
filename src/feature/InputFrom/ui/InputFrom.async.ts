import { lazy } from "react";

export const InputFromAsync = lazy(async () => await import("./Form").then(module => ({ default: module.Form })));
