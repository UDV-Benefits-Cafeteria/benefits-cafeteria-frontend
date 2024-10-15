import { EMAIL_REGEX } from "../regex";

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};
