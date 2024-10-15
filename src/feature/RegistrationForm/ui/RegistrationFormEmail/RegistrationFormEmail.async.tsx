import { lazy } from "react";

export const RegistrationFormEmail = lazy(
  async () => await import("./RegistrationFormEmail").then(module => ({ default: module.RegistrationFormEmail }))
);
