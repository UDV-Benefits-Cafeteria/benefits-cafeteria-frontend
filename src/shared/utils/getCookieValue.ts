import type { TUserRole } from "@entity/User/model/types/User.types";

export type TCookieName = "role";

export const getCookieValue = (name: TCookieName): TUserRole | undefined => {
  const cookies = document.cookie.split(";");
  const res = cookies.find(c => c.startsWith(name + "="));

  if (res) {
    return decodeURI(res.substring(res.indexOf("=") + 1)) as TUserRole;
  }
};

getCookieValue("role");
