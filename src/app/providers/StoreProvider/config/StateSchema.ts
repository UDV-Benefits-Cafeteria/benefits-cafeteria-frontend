import type { TRegistrationFormSliceSchema } from "@feature/RegistrationForm";
import { type rtkApi } from "@shared/api/rtkApi";

import { TBenefit } from "@entity/Benefit/model/types/Benefit.types";
import { TLegalEntity } from "@entity/LegalEntities/model/types/LegalEntities.types";
import { TPosition } from "@entity/Position/model/types/Position.types";
import type { TUserData, TUserSliceSchema } from "@entity/User/model/types/User.types";

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  user: TUserSliceSchema;
  registrationForm: TRegistrationFormSliceSchema;
  createEmployeeForm: TUserData;
  positions: { positions: TPosition[] };
  legalEntities: { legalEntities: TLegalEntity[] };
  createBenefitForm: TBenefit;
}

export type StateSchemaKeys = keyof StateSchema;
