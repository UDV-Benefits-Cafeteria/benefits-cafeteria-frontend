import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { NOT_AUTHORIZED, NOT_FOUND, SERVER_ERROR } from "@shared/consts/statusCode";

type TRequestErrors = typeof SERVER_ERROR | typeof NOT_FOUND | typeof NOT_AUTHORIZED;

export type TErrorsTexts = { [k in TRequestErrors]: string };

const defaultErrorsTexts: Partial<TErrorsTexts> = {
  404: "Не найдено",
  401: "Пользователь не зарегестрирован",
  500: "Ошибка сервера",
};

export const getRequestError = (errorsTexts: Partial<TErrorsTexts>, error?: FetchBaseQueryError | SerializedError) => {
  const errorStatus = (error as FetchBaseQueryError).status;

  if (errorsTexts.hasOwnProperty(errorStatus)) return errorsTexts[errorStatus as TRequestErrors];

  if (errorStatus === NOT_AUTHORIZED) return defaultErrorsTexts["401"];

  if (errorStatus === NOT_FOUND) return defaultErrorsTexts["404"];

  if (errorStatus === SERVER_ERROR) return defaultErrorsTexts["500"];
};
