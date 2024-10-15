import { type rtkApi } from "@shared/api/rtkApi";

import type { TUserSliceSchema } from "@entity/User/model/types/User.types";

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
  user: TUserSliceSchema;
}

export type StateSchemaKeys = keyof StateSchema;
