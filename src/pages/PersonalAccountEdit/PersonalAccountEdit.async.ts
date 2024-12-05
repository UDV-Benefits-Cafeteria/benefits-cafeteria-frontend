import { lazy } from "react";

export const PersonalAccountEditAsync = lazy(
  async () => await import("./PersonalAccountEdit").then(module => ({ default: module.PersonalAccountEdit }))
);
