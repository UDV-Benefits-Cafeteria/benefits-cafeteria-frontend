export type TUserRole = "hr" | "employee" | "admin";

export type TUserSliceSchema = {
  isAuth?: boolean;
  isMounted?: boolean;
  role: TUserRole;
};
