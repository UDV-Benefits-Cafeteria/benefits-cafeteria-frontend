import { ComponentType, lazy } from "react";

export const UserAsync = lazy<TUserProps>(
  async () => await import("./User").then(module => ({ default: module.User }))
);
