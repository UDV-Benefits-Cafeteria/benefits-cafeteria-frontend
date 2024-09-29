import { type rtkApi } from "@shared/api/rtkApi";

export interface StateSchema {
  [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;
}

export type StateSchemaKeys = keyof StateSchema;
