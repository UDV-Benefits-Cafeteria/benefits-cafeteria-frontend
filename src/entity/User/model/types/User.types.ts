import type { TLegalEntity } from "@entity/LegalEntities/model/types/LegalEntities.types";
import type { TPosition } from "@entity/Position/model/types/Position.types";

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
  position_id?: number;
  legal_entity_id?: number;
  position: TPosition | null;
  legal_entity: TLegalEntity | null;
  experience: number;
  image_url?: string;
  level: number;
};
