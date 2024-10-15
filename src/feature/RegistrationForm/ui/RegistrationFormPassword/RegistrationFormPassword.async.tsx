import { lazy } from "react";

export const RegistrationFormPassword = lazy(
  async () => await import("./RegistrationFormPassword").then(module => ({ default: module.RegistrationFormPassword }))
);
