import { FC } from "react";

import { useAppSelector } from "@shared/lib/hooks/useAppSelector/useAppSelector";
import { useAuth } from "@shared/lib/hooks/useAuth/useAuth";

export const AuthProvider: FC<{ children: JSX.Element }> = ({ children }) => {
  const isUserMounted = useAppSelector(state => state.user.isMounted);

  useAuth();

  return isUserMounted ? (
    children
  ) : (
    <h1
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      Loading...
    </h1>
  );
};
