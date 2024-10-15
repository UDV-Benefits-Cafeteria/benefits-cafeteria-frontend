import type { TUserRole } from "@entity/User/model/types/User.types";

export type TRoute = {
  path: string;
  element: JSX.Element;
  role?: TUserRole[];
  needAuth?: boolean;
};
