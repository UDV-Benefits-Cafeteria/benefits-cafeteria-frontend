export type TUserRole = "hr" | "employee" | "admin";

export type TUserSliceSchema = {
  isAuth?: boolean;
  isMounted?: boolean;
  data?: TUserData;
};

export type TUserData = {
  email: string;
  firstname: string;
  lastname: string;
  middlename: string;
  coins: number;
  role: TUserRole;
  hired_at: string;
  is_active: boolean;
  is_verified: boolean;
  is_adapted: boolean;
  id: number;
  position: TPosition | null;
  legal_entity: TLegalEntity | null;
  experience: number;
  level: number;
};

export type TPosition = {
  id: number;
  name: string;
};

export type TLegalEntity = {
  id: number;
  name: string;
};
