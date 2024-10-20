const PASSWORD_MIN_LENGTH = 8;

export const validatePassword = (password: string) => {
  return password.length >= PASSWORD_MIN_LENGTH;
};
